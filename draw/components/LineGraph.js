
class LineGraph {
	constructor(p, x, y, width, variants) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.width = width;
		this.variants = variants;
		this.over = false;
	}

	// Check if mouse is over the bubble
	rollover(px, py) {
		this.over = px > this.x && px < this.x + this.width
	}

	// Display the Bubble
	display() {
		var color_a = this.p.color(255, 182, 185);
		var color_b = this.p.color(182, 185, 255);
		this.p.stroke(0);
		this.p.strokeWeight(0.8);
		var color = 0;
		var base = 0;
		this.variants.forEach(element => {
			if(color) this.p.fill(color_a)
			else this.p.fill(color_b);
			color = !color;
			this.p.rect(this.x, this.y + base, this.width, element.height);
			base += element.height;
			if (this.over) {
				this.p.fill(0);
				this.p.rect(this.x, this.y, 10, 100)
				this.p.text(element.name, this.x, this.y + this.radius + 20);
			}
		});
	}
}

module.exports = {
	linegraph: LineGraph
};
