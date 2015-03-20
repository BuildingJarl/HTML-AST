import Tag from './Tag';

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

class Parser {
	constructor( options ){
		this.options = options || {};
		this.options.components = this.options.components || {};
	}

	parse( html ) {
		var ast = [];

		var level = -1;
		var current;
		var arr = [];
		var byTag = {};
		var inComponent = false;

		//Not needed -> to delete -> jsut kept for reference that this was tried
		//html = html.slice(html.indexOf('<'));
		//html = html.slice(0, html.lastIndexOf('>') + 1);

		html.replace( tagRE, (tag, index) => {

			if(inComponent) {
				if(tag !== ('</' + current.name + '>')) {
					return;
				} else {
					inComponent = false;
				}
			}

			var isOpen = tag.charAt(1) !== '/';
			var start = index + tag.length;
			var nextChar = html.charAt(start);
			var parent;

			if(isOpen) {
				level ++;

				current = new Tag(tag);

				if(current.type === 'tag' && this.options.components[current.name]) {
					current.type = 'component';
					inComponent = true;
				}

				//if tag has a body
				if(!current.voidElement && !inComponent && nextChar && nextChar !== '<') {

					let content = html.slice(start, html.indexOf('<', start));
					content = content.replace(/\n/g, '');
					content = content.replace(/\t/gm, '');
					content = content.replace(/\r/gm, '');
					content = content.replace(/\r\n/gm, '');

					if(content.length > 0) {
						current.children.push({
							type: 'text',
							content: content
						})
					}
				}

				byTag[current.tagName] = current;

				//if we are at root, push new base node
				if(level === 0) {
					ast.push(current);
				}

				parent = arr[level - 1];

				if(parent) {
					parent.children.push(current);
				}

				arr[level] = current;
			}

			if(!isOpen || current.voidElement) {
				level --;

				if(!inComponent && nextChar !== '<' && nextChar) {
					//dont think this is needed
					/*
					let content = html.slice(start, html.indexOf('<', start));
					content = content.replace(/\n/g, '');
					content = content.replace(/\t/gm, '');
					content = content.replace(/\r/gm, '');
					content = content.replace(/\r\n/gm, '');
					
					//trailing text node
					if(content.length > 0) {
						arr[level].children.push({
							type: 'text',
							content: content
						})
					}
					*/

				}
			}
		});

		return ast;
	}

	toString( ast ){

		function attrString(attrs) {
		    var buff = [];
		    for (var key in attrs) {
		        buff.push(key + '="' + attrs[key] + '"');
		    }
		    if (!buff.length) {
		        return '';
		    }
		    return ' ' + buff.join(' ');
		}

		function stringify(buff, doc) {
		    switch (doc.type) {
		    case 'text':
		        return buff + doc.content;
		    case 'tag':
		        buff += '<' + doc.name + (doc.attrs ? attrString(doc.attrs) : '') + (doc.voidElement ? '>' : '>');
		        if (doc.voidElement) {
		            return buff;
		        }
		        return buff + doc.children.reduce(stringify, '') + '</' + doc.name + '>';
		    }
		}

		return ast.reduce(function (token, rootEl) {
        	return token + stringify('', rootEl);
    	}, '');
	} 
}

export default new Parser();