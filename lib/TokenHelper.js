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
}

export default new TokenHelper();