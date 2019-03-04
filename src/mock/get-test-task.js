import {colorList} from '../common';
import tagList from './tag-list';
import titleList from './title-list';

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

const getRandomDate = (days) => {
  return Date.now() + 1 + getRandomIndex(days) * 24 * 60 * 60 * 1000;
};

const getRandomSet = (length, array) => {
  const len = array.length;
  const temp = (new Array(length).fill(1)).map(() => array[getRandomIndex(len)]);
  return (new Set(temp));
};

const getTestTask = () => {
  return {
    title: titleList[getRandomIndex(titleList.length)],
    dueDate: getRandomDate(7),
    tags: getRandomSet(3, tagList),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: colorList[getRandomIndex(colorList.length)],
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
