'use strict';

const { getFillColor } = require('./draw/colorController');
// import LineGraph from "./components/LineGraph";
const lineGraphLib = require('./draw/components/LineGraph');
const dnaLabelLib = require('./draw/components/DNALabel');
const gapLabelLib = require('./draw/components/GapLabel');


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Imports P5. Instantiates the sketch at the bottom of this file.

const p5 = require('p5');
//Imports our custom function to decide what color the fill shall be.

console.log('logging')
const bar_width = 10

//Starting out sketch and
//injecting p5, as the param p, into our sketch function.
  const sketch = (p) => {


	let op = "bruh";

	p.setup = () => {
		// Create the canvas
		let height = p.windowHeight - (p.windowHeight / 4);
		p.createCanvas(2000, p.windowHeight);

	};



	p.draw = () => {
		p.clear();
		let height = p.windowHeight - (p.windowHeight / 4);
		p.strokeWeight(25);
		p.stroke(p.color(190,235, 233));
		p.line(0, height, 2000, height);
		var variants = [
			{ height: -30, name: "3" },
			{ height: -56, name: "5" },
			{ height: -12, name: "6" }
		];
		let dna = new dnaLabelLib.dnalabel(p, p.windowWidth / 2 + 100, height, 12*bar_width, "GENE 1");
		dna.display();
		let gap = new gapLabelLib.gaplabel(p, p.windowWidth / 2 - 100, height, 2*bar_width, "12345", "13456");
		gap.display();
		let linegraph = new lineGraphLib.linegraph(p, p.windowWidth / 2, height, bar_width, variants);
		linegraph.rollover(p.mouseX, p.mouseY);
		linegraph.display();
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}
};
//Instantiates P5 sketch to keep it out of the global scope.
const app = new p5(sketch, 'container');
