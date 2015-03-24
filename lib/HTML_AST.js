import Tag from './Tag';
import Helper from './TokenHelper';

const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

class HTML_AST {
	constructor( ){
	}

	stringToAst( html ) {
		
		var ast = [];
		var tokens = Helper.tokenize( tagRE, html );

		recursive( tokens );

		return ast;

		function recursive( elements, parent ) {

			for( var i = 0; i < elements.length; i++ ) {

				if(Helper.isOpeningTag( elements[i].tag ) ) {
					
					let tag = new Tag( elements[i].tag );

					if(parent) {
						parent.children.push(tag);
					} else {
						ast.push(tag);
					}

					//is it a self closing tag?
					if(tag.voidElement === true) {

					} else {
						let closing = Helper.findClosing( tag.name, elements.slice(i) ); 
						let ch;

						if(closing) {
							i = elements.indexOf(closing) - 1;
							ch = elements.slice(i, elements.indexOf( closing ) );
						} else {
							ch = elements.slice(i+1);
						}
						recursive( ch,  tag);
					}
				}

				//is it a closing tag?
				if(Helper.isClosingTag( elements[i].tag ) ) {

				}
			}
		}
	}
}

export default new HTML_AST();