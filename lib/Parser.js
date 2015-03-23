import Tag from './Tag';

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

const voidElements = {
	area: true,
	base: true,
	br: true,
	col: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	menuitem: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true
}

class Parser {
	constructor( ){
	}

	tokenize( html ) {
		
		var tokens = [];
		var indexInArray = 0;
		html.replace( tagRE, ( tag, index ) => {

			tokens.push( { tag: tag, indexInString: index, indexInArray: indexInArray++ } );
		});

		return tokens;
	}

	isOpeningTag( tag ) {
		if(tag) {
			if( tag.charAt(0) === '<' && tag.charAt(1) !== '/' ) {
				return true;
			}
		}
		return false;
	}

	isClosingTag( tag ) {
		if(tag) {
			if( tag.charAt(0) === '<' && tag.charAt(1) === '/' ) {
				return true;
			}
		}
		return false;
	}

	findClosingToken( tokens ) {

		let inChild = 0;

		for( let [i,token] of tokens.entries() ) {
			if(this.isOpeningTag(token.tag)) {				
				if(!voidElements[this.getTagName(token.tag)]) {
					inChild++;
				}
			}
			if(this.isClosingTag(token.tag)) {
				if(inChild === 0) {
					return token;
				}
				inChild--;
			}
		}

		return null;
	}

	getTagName( tagString ) {

		let i1 = tagString.indexOf('>');
		let i2 = tagString.indexOf(' ');
		let end;

		if(i2 === -1) {
			end = i1;
		} else {
			if(i2 < i1) {
				end = i2;
			} else {
				end = i1;
			}
		}

		let name = tagString.substring( 1, end);

		return name;
	}

	parse1( html ) {
		
		var tokens = htmlHelper.tokenizeString();

		/*
		var ast = [];
		var tokens = this.tokenize(html);

		var lineNr = 0;
		var tabSize = 4;
		
		RR.call(this,tokens)

		return ast;

		//console.log(JSON.stringify(ast,null, " "));
		function RR(tokens, parent) {
			
			for( let i = 0; i < tokens.length; i++) {
				
				let token = tokens[i];

				if( this.isOpeningTag( token.tag ) ) { 

					let currentTag = new Tag(token.tag);

					if(currentTag.voidElement) {
						//closing pos is at the end of the tag since its self closing
						//also cannot have text nodes!
					} else {
						
						let closing = this.findClosingToken( tokens.slice( token.indexInArray + 1 ) );
						
						let children = [];
						if(closing) {
							i = closing.indexInArray - 1;

							let start = token.indexInArray + 1;
							let stop = closing.indexInArray;
							
							let newArr = tokens.slice( start, stop )
							newArr = newArr.map(( el,index ) => {
								el.indexInArray = index;
								return el;
							});

						} else {
							//i = closing.indexInArray - 1;

							let start = token.indexInArray + 1;
							
							let newArr = tokens.slice( start )
							newArr = newArr.map(( el,index ) => {
								el.indexInArray = index;
								return el;
							});
						}


						RR.call(
							this, 
							newArr, 
							currentTag
						);
					}

					//THIS HERE MIGHT NOT BE RIGHT!!
					if(!parent) {
						ast.push(currentTag);
						parent = currentTag;
					} else {	
						parent.children.push(currentTag);
					}
				}
				else {
					console.log("close");
				}	
			}
		}
		*/		
	}


	/*
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
					*//*

				}
			}
		});

		return ast;
	}
	*/
	/*
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
	*/
}

export default new Parser();