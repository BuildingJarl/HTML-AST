import Tag from './Tag';
import Helper from './TokenHelper';

//const tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
const tagRE = /(?:<|<\/)[^>|<]+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>/g;

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
						tag.location = Helper.calcLocation( html, elements[i].startOfTagPos, elements[i].endOfTagPos );

					} else {
						let closing = Helper.findClosing( tag.name, elements.slice(i + 1) ); 
						let start = i + 1;
						let end = elements.length;

						if(closing) {
							end = elements.indexOf(closing);
							tag.location = Helper.calcLocation( html, elements[i].startOfTagPos, closing.endOfTagPos );
						} else {
							//closing tag is at end of line	
							tag.location = Helper.calcLocation( html, elements[i].startOfTagPos, elements[elements.length-1].endOfTagPos );
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