class HtmlAst {
	
	constructor() {
		this.domParser = new DOMParser();
	}


	toAst( html ) {

		var ast = [];
		
		var parsed = this.domParser.parseFromString( html, 'text/html' );

		//parsed.firstChild //html
		//parsed.body //body

		console.log(parsed.body)

		function parse( ) {

		}
		/*
		//do magic parsing here!
		ast = parse.call( this, parsed.children, html );

		function parse( nodes, src ) {
			
			var children = [];

			for( let i = 0; i < nodes.length; i++ ) {
				
				let element = nodes[i];
				let astNode = {};

				//only take properties that are needed!
				astNode.type = 'tag';
				astNode.name = element.nodeName;
				astNode.children = [];
				astNode.attrs = element.attributes;
				astNode.innerHTML = element.innerHTML;
				astNode.innerText = element.innerText;
				astNode.outerHTML = element.outerHTML;
				astNode.outerText = element.outerText;				
				
				var blobIndex = src.indexOf( element.outerHTML );
				var blob = src.substr( 0, blobIndex );
				//var offsetRange = this.calcRange( blob );

				var relativeRange = this.calcRange( element.outerHTML );

				astNode.location = this.calcOffset( blob, relativeRange );

				children.push( astNode );
				astNode.children = parse.call( this, element.children, element.outerHTML );
			}

			return children;
		}


		return ast;
		*/
	}

	calcOffset( string, current ) {

		var rows = string.split('\n');
		var lastRow = rows[rows.length - 1];
		var start = {};
		var end = {};

		//no newline
		if(rows.length === 1) {
			start.row = current.start.row;
		} else {
			start.row = (rows.length - 1) + current.start.row;
		}
		start.col = current.start.col + lastRow.length;
		
		end.row = start.row + current.end.row;
		end.col = current.end.col + lastRow.length;

		return { start: start, end: end };
	}

	calcRange( string ) {

		var rows = string.split( '\n' );
		var lastRow = rows[rows.length - 1];

		var start = {
			row: 0,
			col: 0
		};

		var colIndex = 0;

		if(lastRow === "") {
			colIndex = 0;
		} else {
			colIndex = lastRow.length - 1;
		}

		var end = {
			row: rows.length - 1,
			col: colIndex
		}

		return { start: start, end: end };
	}

	traverse( ast, cb ) {

		trav( ast );

		function trav( nodes ) {

			for( let [i, node] of nodes.entries() ) {
				cb(node);
				trav(node.children);
			}
		}
	}
}

export default new HtmlAst();

/*
Notes

- not a very good idea to parse html with regex
	- see stackoverflow for this

- use dom parser? 
	- var parsed=new DOMParser.parseFromString(htmlString,'text/html');
*/