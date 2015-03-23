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

const lookupProperElemens = {
	'!DOCTYPE': true,
	a: true,
	abbr: true,
	address: true,
	area: true,
	article: true,
	aside: true,
	audio: true,
	b: true,
	base: true,
	bdi: true,
	bdo: true,
	blockquote: true,
	body: true,
	br: true,
	button: true,
	canvas: true,
	caption: true,
	cite: true,
	code: true,
	col: true,
	colgroup: true,
	datalist: true,
	dd: true,
	del: true,
	details: true,
	dfn: true,
	dialog: true,
	div: true,
	dl: true,
	dt: true,
	em: true,
	embed: true,
	fieldset: true,
	figcaption: true,
	figure: true,
	footer: true,
	form: true,
	h1: true,
	h2: true,
	h3: true,
	h4: true,
	h5: true,
	h6: true,
	head: true,
	header: true,
	hr: true,
	html: true,
	i: true,
	iframe: true,
	img: true,
	input: true,
	ins: true,
	kbd: true,
	keygen: true,
	label: true,
	link: true,
	li: true,
	main: true,
	map: true,
	mark: true,
	menu: true,
	menuitem: true,
	meta: true,
	meter: true,
	nav: true,
	noscript: true,
	object: true,
	ol: true,
	optgroup: true,
	option: true,
	output: true,
	p: true,
	param: true,
	pre: true,
	progress: true,
	q: true,
	rp: true,
	rt: true,
	ruby: true,
	s: true,
	samp: true,
	script: true,
	section: true,
	select: true,
	small: true,
	source: true,
	span: true,
	strong: true,
	style: true,
	sub: true,
	summary: true,
	sup: true,
	table: true,
	tbody: true,
	td: true,
	textarea: true,
	tfoot: true,
	th: true,
	thead: true,
	time: true,
	title: true,
	tr: true,
	track: true,
	u: true,
	ul: true,
	var: true,
	video: true,
	wbr: true
}


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