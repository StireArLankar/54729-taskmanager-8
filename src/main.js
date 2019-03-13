import {getTestTaskList} from './mock';
import Board from './class/board';

let board;

window.addEventListener(`load`, () => {
  const tasks = getTestTaskList(12);
  board = new Board(tasks);
  board.render();
});

