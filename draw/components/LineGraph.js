
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
		let base = 0;
		this.variants.forEach(element => {
			element.over = px > this.x && px < this.x + this.width && this.y + element.height + base < py && this.y + base > py;
			base += element.height
		})
	}

	// Display the Bubble
	display() {
		this.p.stroke(0);
		let color = 0;
		let base = 0;
		let height = 0;
		this.variants.forEach(element => {
			let bruh = `Reference Sequence: ${element.reference_sequence} \nReference Start: ${element.start_position} \nReference Count: ${element.reference_read_count} \n Variant Sequence: ${element.variant_sequence} \n Variant Readcount: ${element.variant_read_count}`;
			if(color) this.p.fill(this.p.color(255, 182, 185));
			else this.p.fill(this.p.color(182, 185, 255));
			color = !color;
			this.p.strokeWeight(0);
			this.p.rect(this.x, this.y + base, this.width, element.height);
			base += element.height;
			height += element.height;
			this.p.fill(this.p.color(255, 182, 185));
			this.p.strokeWeight(0);
			this.p.rect(this.x, this.y - 14, this.width, element.height);
			if (element.over) {
				this.p.fill(255);
				this.p.strokeWeight(0.75);
				this.p.rect(this.x + (150 / this.x * (this.x / 8)), this.y - (-1 * element.height - 90), 150, -90, 0, 15, 15, 0);
				this.p.fill(0);
				this.p.strokeWeight(0.25);
				this.p.textSize(10);
				this.p.text(bruh, this.x + (150 / this.x * (this.x / 8) + 5), this.y - (-1 * element.height - 10), 150, 100);
			}
		});
	}
}

module.exports = {
	linegraph: LineGraph
};
