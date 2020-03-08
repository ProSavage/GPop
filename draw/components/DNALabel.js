class DNALabel {

	constructor(p, x, y, label) {
		this.x = x;
		this.y = y;
		this.label = label;
		this.p = p;
	}


	display() {
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		this.p.fill(this.p.color(117, 218, 173));
		this.p.text(this.label, this.x, this.y);
		let height = this.p.windowHeight - (this.p.windowHeight / 4);
		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, height + 20, this.x + 100, height + 20);
	}
}
module.exports = {
	dnalabel: DNALabel
};
