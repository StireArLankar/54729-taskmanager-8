import Component from "./component";
import filterList from '../filter-list';
import {renderFilter, clearFiltersSection, addFiltersListener} from '../components/filter';
import TaskComponent from "./task-component";
import {tasksContainerName} from '../containers';

const tasksContainer = document.querySelector(tasksContainerName);

class Board extends Component {
  constructor(tasks) {
    super();
    this._tasks = tasks.map((task, index) => {
      const temp = task;
      temp.index = index;
      return new TaskComponent(temp, this);
    });

    this.randomizer = this.randomizer.bind(this);
  }

  get tasks() {
    return this._tasks;
  }

  bind() {
    addFiltersListener(this.randomizer);
  }

  randomizer() {
    this._tasks.forEach((task) => task.unrender());
    const temp = this._tasks.filter(() => {
      return Math.random() > 0.7;
    });
    this.renderTasks(temp);
  }

  renderTasks(tasks) {
    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => {
      fragment.appendChild(task.render());
    });
    clearElement(tasksContainer);
    tasksContainer.appendChild(fragment);
  }

  render() {
    clearFiltersSection();
    filterList.forEach((filter) => renderFilter(filter));
    this.renderTasks(this._tasks);
    this.bind();
  }
}

const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

export default Board;
