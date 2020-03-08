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
		this.p.text(this.start, this.x, this.y);
		let height = this.p.windowHeight - (this.p.windowHeight / 4);
		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x + this.width, height + 20, this.x + this.width, height + 30);
		this.p.stroke(this.p.color(100, 230, 153));
		this.p.text(this.end, this.x + this.width, height + 60);

		this.p.stroke(this.p.color(117, 218, 173));
		this.p.line(this.x, height + 20, this.x, height + 30);
		this.p.stroke(this.p.color(100, 230, 153));
		this.p.text(this.start, this.x, height + 45);
	}
}
module.exports = {
	gaplabel: GapLabel
};
