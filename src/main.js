import filterList from './filter-list';
import {daysList} from './common';
import {renderFilter, clearFiltersSection, addFiltersListener} from './components/filter';
import {changeTasks} from './components/card';

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

