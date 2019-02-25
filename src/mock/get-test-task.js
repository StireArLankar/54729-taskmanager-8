import {colorList} from '../common';

const getTestTask = () => {
  return {
    title: [
      `Prepare for the pitch`,
      `find money for travel`,
      `eat something`,
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    tags: new Set([
      `cinema`,
      `entertainment`,
      `myself`,
      `cinema`,
    ]),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: colorList[Math.floor(Math.random() * colorList.length)],
    repeatingDays: {
      'mo': true,
      'tu': false,
      'we': true,
      'th': false,
      'fr': false,
      'sa': true,
      'su': false,
    },
    isFavourite: false,
    isDone: false
  };
};

export default getTestTask;
