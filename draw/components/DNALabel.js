class DNALabel {

	constructor(p, x, height, length, label) {
		this.p = p;
		this.x = x;
		this.height = height;
		this.length = length;
		this.label = label;
	}

	display() {
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		this.p.fill(this.p.color(117, 218, 173));
		this.p.text(this.label, this.x, this.height + 43);
		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, this.height + 30, this.x + this.length, this.height + 30);
	}
}
module.exports = {
	dnalabel: DNALabel
};
