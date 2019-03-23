import Board from './class/board';

let board;

window.addEventListener(`load`, () => {
  board = new Board();
  board.start();
});

