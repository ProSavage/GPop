'use strict';

//Returns black fill if the mouse is pressed, else white as fill.
function getFillColor(mouseIsPressed) {
  return mouseIsPressed ? 0 : 25;
}

module.exports = {
  getFillColor
}