class GapLabel {

	constructor(p, x, y, width, start, end) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.width = width;
		this.start = start;
		this.end = end;
	}

	display() {
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		this.p.fill(this.p.color(117, 218, 173));
		this.p.text(this.start, this.x, this.y);
		let height = this.p.windowHeight - (this.p.windowHeight / 4);
		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, height + 20, this.x, height + 70);
		this.p.text(this.start, this.x, this.y);

		this.p.line(this.x + this.width, height + 20, this.x + this.width, height + 70);
		this.p.text(this.end, this.x + this.width, this.y);
	}
}
module.exports = {
	gaplabel: GapLabel
};
