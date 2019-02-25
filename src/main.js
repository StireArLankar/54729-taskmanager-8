import filterList from './filter-list';
import {renderFilter, clearFiltersSection, addFiltersListener} from './components/filter';
import {changeTasks} from './components/card';
import {getTestTask} from './mock';

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

clearFiltersSection();
filterList.forEach((filter) => renderFilter(filter));
addFiltersListener(() => {
  const rand = Math.floor(Math.random() * 5) + 1;
  const array = new Array(rand).fill(1);
  const tasks = array.map((_el, index) => {
    const task = new Task(getTestTask());
    task.index = index;
    return task;
  });
  changeTasks(tasks);
});

window.addEventListener(`load`, () => {
  const array = new Array(7).fill(1);
  const tasks = array.map((_el, index) => {
    const task = new Task(getTestTask());
    task.index = index;
    return task;
  });
  changeTasks(tasks);
});

