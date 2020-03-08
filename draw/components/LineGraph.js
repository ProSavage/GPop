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
        let d = this.p.dist(px, py, this.x, this.y);
        this.over = px > this.x && px < this.x + this.width
    }

    // Display the Bubble
    display() {
        this.p.stroke(0);
        this.p.strokeWeight(0.8);
        this.p.fill(this.p.color(255, 100, 0));
        this.p.rect(this.x, this.y, this.width, this.height);
        if (this.over) {
            this.p.fill(0);
            this.p.text(this.name, this.x, this.y + this.radius + 20);
        }
    }
}

module.exports = {
    linegraph: LineGraph
};