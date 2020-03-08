class GapLabel {

	constructor(p, x, height, width, start, end) {
		this.p = p;
		this.x = x;
		this.height = height;
		this.width = width;
		this.start = start;
		this.end = end;
	}

	rollover(px, py) {
		let base = 0;
		this.over = px > this.x && px < this.x + this.width && this.height + 30 < py && this.height + 60 > py;
		this.px = px;
		this.py = py;
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

		if (this.over) {
			this.p.fill(255);
			this.p.stroke(0);
			this.p.strokeWeight(0.75);
			this.p.rect(this.px, this.py, 35, 10, 0, 15, 15, 0);
			this.p.fill(0);
			this.p.strokeWeight(0.25);
			this.p.textSize(10);
			this.p.text("    gap", this.px, this.py, 150, 100);
		}
	}
}
module.exports = {
	gaplabel: GapLabel
};
