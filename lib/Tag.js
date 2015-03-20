const attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g;

// create optimized lookup object for
// void elements as listed here: 
// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
const lookup = {};
lookup.area = true;
lookup.base = true;
lookup.br = true;
lookup.col = true;
lookup.embed = true;
lookup.hr = true;
lookup.img = true;
lookup.input = true;
lookup.keygen = true;
lookup.link = true;
lookup.menuitem = true;
lookup.meta = true;
lookup.param = true;
lookup.source = true;
lookup.track = true;
lookup.wbr = true;

class Tag {
	constructor( tag ){

		this.type = 'tag';
		this.name = '';
		this.voidElement = false;
		this.attrs = {};
		this.children = [];

		//
		let i = 0;
		let key;

		tag.replace( attrRE, (match) => {

			if(i % 2) {
				key = match;
			} else {
				if(i === 0) {
					if( lookup[match] || tag.charAt(tag.length - 2) === '/') {
						this.voidElement = true;
					}

					this.name = match
				} else {
					//trim whitespaces
					this.attrs[key] = match.replace(/['"]/g, '').trim();
				}
			}
			i++;
		});
	}
}

export default Tag;