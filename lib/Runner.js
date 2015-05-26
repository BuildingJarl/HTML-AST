class Runner {
	
	constructor() {

	}

	run(html) {

		var ast = [];

		var lines = html.split('/n');

		var inOpeningTag = false;
		var tagString = [];

		for( let [ lineNumber, line ] of lines.entries() ) {

			var characters = line.split('');

			for( let [ index, character ] of characters.entries() ) {
				
				tagString.push(character);
				
				if( character === '<') {
					inOpeningTag = true;
				} 
				else if(character === '>') {

					if(inOpeningTag === true) {

						let n = tagString.join('');
						console.log(n);
						tagString = [];
					}
				}
			}
		}

	}
}

function makeNode( tag ){

	var node = {
		type: 'element',
		name: "",
		children: [],
		voidElement: false,
		innerHtml: "",
		location: {
			start: {},
			end: {}
		},
		range: {}
	}
}

export default new Runner();