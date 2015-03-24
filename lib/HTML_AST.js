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

			for( let i = 0; i < elements.length; i++ ) {

				if(Helper.isOpeningTag( elements[i].tag ) ) {
					
					let tag = new Tag( elements[i].tag );

					//is it a self closing tag?
					if(tag.voidElement === true) {

					} else {
						let closing = Helper.findClosing( tag.name, elements.slice(i + 1) ); 
						let start = i + 1;
						let end = elements.length;

						if(closing) {
							end = elements.indexOf(closing);
						} else {
							//closing tag is at end of line	
						}

						i = end
						recursive( elements.slice(start, end),  tag );
					}

					if(parent) {
						parent.children.push(tag);
					} else {
						ast.push(tag);
					}
				}
				/*
				//This will cause errors since elements[i].tag wil be undef
				if(Helper.isClosingTag( elements[i].tag ) ) {

				}*/
			}
		}
	}
}

export default new HTML_AST();