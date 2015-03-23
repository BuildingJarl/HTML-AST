import Tag from './Tag';

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

class Parser {
	constructor( options ){
		this.options = options || {};
		this.options.components = this.options.components || {};
	}

	parse1( html ) {

		function tokenise( html ) {
			var tokens = [];
			
			html.replace( tagRE, ( tag, index ) => {

				tokens.push( { tag: tag, index: index } );
			});

			return tokens;
		}

		function isOpeningTag(tag) {
			if(tag) {
				if( tag.charAt(0) === '<' && tag.charAt(1) !== '/' ) {
					return true;
				}
			}
			return false;
		}

		function isClosingTag(tag) {
			if(tag) {
				if( tag.charAt(0) === '<' && tag.charAt(1) === '/' ) {
					return true;
				}
			}
			return false;
		}

		var ast = [];
		var tagList = [];
		var tagIndex = 0;
		var levelIndex = 0;
		var currentTag = null;
		var parent = null;
		var tokens = tokenise(html);

		for( let [ i, token ] of tokens.entries()) {
			
			if(isOpeningTag(token.tag)){
				
				currentTag = new Tag(token.tag);
				
				//void elemetns are self colsing and do not have a body
				if( !currentTag.voidElement ) {

					let start = token.index + token.tag.length;
					let tagContent = html.substring(start, html.indexOf('<', start));
					
					//Remove and count start nl and tab
					//Remove and count end nl and tab

					//replace and count in content nl
					//replace and count in content tab

					if(tagContent.length >= 1) {
						currentTag.children.push({
							type: 'text',
							content: tagContent
						});
						console.log(currentTag.name + " " + tagContent)
					}
				}

				//This means that we are at root level
				if(levelIndex === 0) {
					ast.push(currentTag);
					parent = currentTag;
				} else {
					parent.children.push(currentTag);
				}

				tagList.push(currentTag);
				tagIndex ++;
				levelIndex --;
			} else if( isClosingTag(token.tag )) {
				levelIndex --;
			}

			return ast;
		}
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