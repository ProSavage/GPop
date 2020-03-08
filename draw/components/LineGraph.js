
class LineGraph {
	constructor(p, x, y, width, height, name) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.radius = height / 2;
		this.name = name;
		this.over = false;
	}

	// Check if mouse is over the bubble
	rollover(px, py) {
		this.over = true
	}

	// Display the Bubble
	display() {
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		this.p.fill(this.p.color(255, 182, 185));
		this.p.rect(this.x, this.y, this.width, this.height);
		if (this.over) {
			console.log("big bruh")
			this.p.fill(0);
			this.p.rect(this.x, this.y, 100, 100)
			this.p.text(this.name, this.x, this.y + this.radius + 20);
		}
	}
}

module.exports = {
	linegraph: LineGraph
};
