import Tag from './Tag';

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

class Parser {
	constructor( options ){
		this.options = options || {};
		this.options.components = this.options.components || {};
		this.options.tabSize = this.options.tabSize || 4;
	}

	parse( html ) {
		var ast = [];

		var level = -1;
		var current;
		var arr = [];
		var byTag = {};
		var inComponent = false;
		var lineNumber = 0;

		//http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
		var startOfHtml = html.slice(0, html.indexOf('<'));
		var tabs = this.options.tabSize * (startOfHtml.match(/\t/g) || []).length;
		lineNumber += (startOfHtml.match(/\n/g) || []).length;

		html = html.slice(html.indexOf('<'));

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
				current.loc.start.col = index;
				current.loc.start.line = lineNumber;

				if(current.type === 'tag' && this.options.components[current.name]) {
					current.type = 'component';
					inComponent = true;
				}

				//if tag has a body
				if(!current.voidElement && !inComponent && nextChar && nextChar !== '<') {

					current.children.push({
						type: 'text',
						content: html.slice(start, html.indexOf('<', start))
					});
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
				arr[level].loc.end.col = start - 1;
				arr[level].loc.end.line = lineNumber;

				level --;

				if(!inComponent && nextChar !== '<' && nextChar) {
					//trainling text node
					arr[level].children.push({
						type: 'text',
						content: html.slice(start, html.indexOf('<', start))
					})
				}
			}
		});

		return ast;
	} 
}

export default new Parser();