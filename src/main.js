import filterList from './filter-list';
import {daysList} from './common';
import {renderFilter, clearFiltersSection, addFiltersListener} from './components/filter';
import {changeTasks} from './components/card';
import getTestTask from './mock';

class Task {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavourite, isDone}) {
    this.title = title;
    this.dueDate = dueDate;
    this.tags = tags;
    this.picture = picture;
    this.color = color;
    this.repeatingDays = repeatingDays;
    this.isFavourite = isFavourite;
    this.isDone = isDone;

    this.isEditing = false;
  }
}

const temp = new Task(getTestTask());

const testTask = {
  color: `black`,
  text: `asd`,
  hashtags: [`repeat`, `cinema`],
  id: Math.floor(100 * Math.random()),
  edit: true,
  repeat: {
    [daysList[0]]: true
  }
};

clearFiltersSection();
filterList.forEach((filter) => renderFilter(filter));
addFiltersListener(() => {
  changeTasks(testTask);
});

window.onload = changeTasks(testTask, 7);

