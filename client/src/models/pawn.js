const colours = require('./colours.js');
const boardPath = require('./board_path.js');
const PubSub = require('../helpers/pub_sub.js');

const Pawn = function () {
  this.id = "";
  this.position = "";
  this.stepcount = 0;
  this.status = 'home';
}

Pawn.prototype.assign = function () {
  PubSub.subscribe('BoardView:pawn-created', (event) => {
    console.log(event.detail);
  });
};

Pawn.prototype.start = function (colour) {
  this.position = colours[colour][0];
  this.status = 'board';
};

Pawn.prototype.move = function (steps, finishArray) {
  const initCoord = boardPath.indexOf(this.position);
  let newCoord = initCoord + steps;
  if (newCoord > 48) {
    this.position = boardPath[newCoord - 48];
  } else {
  this.position = boardPath[newCoord];
  }
  this.stepcount += steps;
  if (this.stepcount > 48) {
    finishArray.forEach((finishCoord) => {
      // const finishDiv = document.querySelector(`#${finishCoord}`);
      // if (finishDiv.innerHTML === "") {
        this.position = finishCoord;
        this.status = 'finish';
      // }
    });
  }
};

module.exports = Pawn;
