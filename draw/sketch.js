'use strict';

const {getFillColor} = require('./draw/colorController');
// import LineGraph from "./components/LineGraph";
const lineGraphLib = require('./draw/components/LineGraph');
const dnaLabelLib = require('./draw/components/DNALabel');
const gapLabelLib = require('./draw/components/GapLabel');
const exonLabelLib = require('./draw/components/ExonLabel');
const sql_queries_library = require("./SQLQueries");

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Imports P5. Instantiates the sketch at the bottom of this file.

const p5 = require('p5');
//Imports our custom function to decide what color the fill shall be.

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

console.log('logging')
const bar_width = 10
var genes = null;
var short_variants = null;
var copy_variants = null;
var variants = null;
var chromosome_id = null;
var sample_id = "TEST";
let ready = false;
var exons = null;
//Starting out sketch and
//injecting p5, as the param p, into our sketch function.
const sketch = (p) => {
	p.setup = () => {
		// Create the canvas
		let height = p.windowHeight - (p.windowHeight / 4);


		p.createCanvas(10000, p.windowHeight);
		sql_queries_library.initialize();
		setTimeout(() => {
			sample_id = 1;
			sql_queries_library.getChromosomeIDs("chr1")
			.then((chromo) => {
				chromosome_id = chromo[0].id;
				return sql_queries_library.getGenesByChromosome(chromosome_id)
			})
			.then((gene) => {
				genes = gene
				return sql_queries_library.getAllShortVariantsBySampleIDAndChromosome(sample_id, chromosome_id)
			})
			.then((short) => {
				console.log(short)
				short_variants = short;
				return sql_queries_library.getAllCopyNumberVariantsBySampleIDAndChromosome(sample_id,chromosome_id)
			})
			.then((copy) => {
				copy_variants = copy;
				copy_variants.forEach(element => {element.copy = True});
				return sql_queries_library.getExonsByChromosome(sample_id, chromosome_id);
			})
			.then((exon) => {
				exons = exon;
				console.log(exons);
				variants = copy_variants.concat(short_variants);
				ready = true;
				console.log(variants)
			})

		}, 1000);
		/*promise =
		getExonsByChromosome
		return sql_queries_library.getChromosomeIDs("chr1")
			})
			.then((chromo) => {
				chromosome_id = chromo[0].id;
				*/
	};


	p.draw = () => {
		if(!ready) return;
		p.clear();
		let height = p.windowHeight - (p.windowHeight / 4);
		p.strokeWeight(25);
		p.stroke(p.color(190, 235, 233));
		p.line(0, height + 13, 10000, height + 13);
		let dna = new dnaLabelLib.dnalabel(p, p.windowWidth / 2 + 100, height, 12 * bar_width, "GENE 1");
		dna.display();
		let gap = new gapLabelLib.gaplabel(p, p.windowWidth / 2 - 100, height, 2*bar_width, "12345", "13456");
		gap.rollover(p.mouseX, p.mouseY);
		gap.display();
		let exon = new exonLabelLib.exonlabel(p, p.windowWidth / 2 - 200, height, 2*bar_width);
		exon.rollover(p.mouseX, p.mouseY);
		exon.display();
		let lastPos = variants[variants.length - 1].start_position;
		let startPos = variants[0].start_position;
		let count = 2000;
		for (let i = 0; i < 2000; i++) {
			const v = variants[i];
			let varheight = v.variant_read_count / (v.reference_read_count + v.variant_read_count) * -100;

			let object = [{ name: v.reference_sequence, copy: false, height:  varheight, reference_sequence: v.reference_sequence, start_position: v.start_position, reference_read_count: v.reference_read_count, variant_sequence: v.variant_sequence, variant_read_count: v.variant_read_count}];
			let linegraph = new lineGraphLib.linegraph(p, v.start_position / 500, height, (v.end_position - v.start_position) * 3, object);
			linegraph.rollover(p.mouseX, p.mouseY);
			linegraph.display();
			count--;
		}
	};


	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}
};
//Instantiates P5 sketch to keep it out of the global scope.
const app = new p5(sketch, 'container');
