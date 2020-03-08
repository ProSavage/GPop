class ExonLabel {

	constructor(p, x, height, length) {
		this.p = p;
		this.x = x;
		this.height = height;
		this.length = length;
		this.y = this.height + 15
	}

	rollover(px, py) {
		let base = 0;
		this.over = px > this.x && px < this.x + this.length && this.y - 2 < py && this.y + 2 > py;
		this.px = px;
		this.py = py;
	}

	display() {
		this.p.stroke(0);
		this.p.strokeWeight(2);
		this.p.fill(this.p.color(30, 30, 255));
		this.p.line(this.x, this.height + 15, this.x + this.length, this.height + 15);
		if (this.over) {
			this.p.fill(255);
			this.p.strokeWeight(0.75);
			this.p.rect(this.px, this.py, 40, 10, 0, 15, 15, 0);
			this.p.fill(0);
			this.p.strokeWeight(0.25);
			this.p.textSize(10);
			this.p.text("    exon", this.px, this.py, 150, 100);
		}
	}
}
module.exports = {
	exonlabel: ExonLabel
};
