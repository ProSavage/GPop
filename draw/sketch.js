'use strict';

const { getFillColor } = require('./draw/colorController');
// import LineGraph from "./components/LineGraph";
const lineGraphLib = require('./draw/components/LineGraph');


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Imports P5. Instantiates the sketch at the bottom of this file.

const p5 = require('p5');
//Imports our custom function to decide what color the fill shall be.

console.log('logging')
//Starting out sketch and
//injecting p5, as the param p, into our sketch function.
const sketch = (p) => {


  let op = [];

  p.setup = () => {
    // Create the canvas
    let height = p.windowHeight - (p.windowHeight / 4);
    p.createCanvas(2000, p.windowHeight);
    for (let i = 0; i < 1000; i++) {
      let bruh = Math.round(Math.random() * p.windowWidth);
      let okay = Math.round(Math.random() * 2);
      if (okay < 1) {
          bruh = -1 * bruh
      }
      op[i] = new lineGraphLib.linegraph(p, bruh, height, 10, 100, "Bruh");
    }

  };


  p.draw = () => {
    p.clear();
    let height = p.windowHeight - (p.windowHeight / 4);
    p.line(0, height, 2000, height);
    for (let i = 0; i < 1000; i++) {
      op[i].display();
      op[i].rollover(p.mouseX, p.mouseY);
    }

  };



  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};

//Instantiates P5 sketch to keep it out of the global scope.
const app = new p5(sketch, 'container');