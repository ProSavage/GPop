class GapLabel {

	constructor(p, x, height, width, start, end) {
		this.p = p;
		this.x = x;
		this.height = height;
		this.width = width;
		this.start = start;
		this.end = end;
	}

	display() {
		this.p.stroke(0);
		this.p.strokeWeight(1.2);
		this.p.fill(this.p.color(117, 218, 173));

		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, this.height + 30, this.x, this.height + 40);
		this.p.stroke(this.p.color(100, 230, 153));
		this.p.text(this.start, this.x, this.height + 50);

		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x + this.width, this.height + 30, this.x + this.width, this.height + 40);
		this.p.stroke(this.p.color(100, 230, 153));
		this.p.text(this.end, this.x + this.width, this.height + 60);
	}
}
module.exports = {
	gaplabel: GapLabel
};
