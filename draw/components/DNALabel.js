class DNALabel {

	constructor(p, x, y, length, label) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.length = length;
		this.label = label;
	}


	display() {
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		this.p.fill(this.p.color(117, 218, 173));
		this.p.text(this.label, this.x, this.y);
		let height = this.p.windowHeight - (this.p.windowHeight / 4);
		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, height + 20, this.x + this.length, height + 20);
	}
}
module.exports = {
	dnalabel: DNALabel
};
