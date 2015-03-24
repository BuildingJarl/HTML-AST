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
};

class TokenHelper {

	tokenize( rex , inputString ) {

		var tokens = [];
		
		inputString.replace( rex, ( tag, i ) => {

			let startOfTagPos = i;
			let endOfTagPos = i + (tag.length - 1);

			tokens.push( { tag: tag, startOfTagPos: startOfTagPos, endOfTagPos: endOfTagPos } );
		});

		return tokens;
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

		let name;

		if(tagString.charAt(1) === '/') {
			name = tagString.substring( 2, end);
		} else {
			name = tagString.substring( 1, end);
		}

		return name;
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

	findClosing( tagName, tokens ) {

		let inChild = 0;

		for( let [i,token] of tokens.entries() ) {
			if(this.isOpeningTag(token.tag)) {				
				if(!voidElements[this.getTagName(token.tag)]) {
					inChild++;
				}
			}
			if(this.isClosingTag(token.tag)) {
				if(inChild === 0) {
					if( tagName === this.getTagName(token.tag)) {
						return token;
					}
				}
				inChild--;
			}
		}

		return null;
	}

	calcLocation( inputString, start, end ) {

		var top = inputString.slice(0, start);
		var bottom = inputString.slice(start, end);

		var temp = top.split('\n');
		var rowStart = temp.length - 1;
		var colStart = temp[temp.length-1].length;

		console.log(rowStart);
		console.log(colStart);

		/*
		let rowCount = 0;
		let colCount = 0;



				//is the tag on a nl or in the middle of a line?
		let aa = original.lastIndexOf('\n',start);

		getStartingOffset(topSplit);

		var offsetRow = offset.split('\n').length;

		let lines = inputString.split('\n');

		function getStartingOffset (input) {

			var ii = input.lastIndexOf('\n');

			//no nl
			if(ii === -1) {

			} else {
				let temp = input.slice(ii).split('\t');

				temp.forEach(function(line){

				})
			}


			for(let i = index; i < html.length; i++) {
				let cchar = html.charAt(i);

				if(cchar === '\t') {

				}
			}

		}
		*/
	}
}

export default new TokenHelper();