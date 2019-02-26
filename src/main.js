import filterList from './filter-list';
import {renderFilter, clearFiltersSection, addFiltersListener} from './components/filter';
import {changeTasks} from './components/card';
import {getTestTaskList} from './mock';

clearFiltersSection();
filterList.forEach((filter) => renderFilter(filter));

addFiltersListener(() => {
  const rand = Math.floor(Math.random() * 5) + 1;
  const tasks = getTestTaskList(rand);
  changeTasks(tasks);
});

window.addEventListener(`load`, () => {
  const tasks = getTestTaskList(7);
  changeTasks(tasks);
});

