import Component from "./component";
import filterList from '../filter-list';
import {renderFilter, clearFiltersSection, addFiltersListener} from '../components/filter';
import TaskComponent from "./task-component";
import {tasksContainerName} from '../containers';

const tasksContainer = document.querySelector(tasksContainerName);

class Board extends Component {
  constructor(tasks) {
    super();
    this.onEditorOpening = this.onEditorOpening.bind(this);
    this.onTaskUpdate = this.onTaskUpdate.bind(this);
    this.onTaskDelete = this.onTaskDelete.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this._tasks = tasks.map((task, index) => {
      const temp = task;
      temp.index = index;
      return new TaskComponent(temp, this.onEditorOpening, this.onTaskUpdate, this.onTaskDelete);
    });
    this._renderedTasks = null;
    this._filterMethod = `ALL`;
  }

  get tasks() {
    return this._tasks;
  }

  onEditorOpening() {
    this._renderedTasks.forEach((task) => {
      task.closeEditor();
    });
  }

  onTaskUpdate() {
    this.update();
  }

  onTaskDelete(task) {
    const index = this.tasks.findIndex((el) => el === task);
    const temp = [
      ...this.tasks.slice(0, index),
      ...this.tasks.slice(index + 1)
    ];
    this._tasks = temp;
    this.update();
  }

  renderTasks() {
    const fragment = document.createDocumentFragment();
    this._renderedTasks.forEach((task) => {
      fragment.appendChild(task.render());
    });
    tasksContainer.appendChild(fragment);
  }

  render() {
    this.renderFilterList();
    this.filterTasks();
    this.unrenderTasks();
    this.renderTasks();
  }

  unrenderTasks() {
    this._tasks.forEach((task) => {
      task.unrender();
    });
    clearElement(tasksContainer);
    tasksContainer.innerHTML = ``;
  }

  update() {
    this.renderFilterList();
    this.filterTasks();
    this.unrenderTasks();
    this.renderTasks();
  }

  filterTasks() {
    const filteredTasks = filterTasks(this.tasks, this._filterMethod);
    this._renderedTasks = filteredTasks;
  }

  renderFilterList() {
    const list = [...filterList].map((filter) => {
      const checked = filter.name === this._filterMethod;
      const temp = Object.assign({}, filter, {checked});
      return temp;
    });
    clearFiltersSection();
    list.forEach((filter) => renderFilter(filter, getFilterNumber(this._tasks, filter.name)));
    addFiltersListener(this.onFilterChange);
  }

  onFilterChange(evt) {
    this._filterMethod = evt.target.value;
    this.update();
  }
}

const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

const filterTasks = (tasks, method) => {
  switch (method) {
    case `OVERDUE`: {
      return getOverdueTasks(tasks);
    }
    case `TODAY`: {
      return getTodayTasks(tasks);
    }
    case `REPEATING`: {
      return getRepeatingTasks(tasks);
    }
    default: {
      return tasks;
    }
  }
};

const getFilterNumber = (tasks, method) => {
  switch (method) {
    case `OVERDUE`: {
      return getOverdueTasks(tasks).length;
    }
    case `TODAY`: {
      return getTodayTasks(tasks).length;
    }
    case `FAVOURITES`: {
      return 0;
    }
    case `REPEATING`: {
      return getRepeatingTasks(tasks).length;
    }
    case `TAGS`: {
      return 0;
    }
    case `ARCHIVE`: {
      return 0;
    }
    default: {
      return tasks.length;
    }
  }
};

const getOverdueTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    return task.dueDate < Date.now();
  });
};

const getTodayTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }
    const taskDate = getDateString(task.dueDate);
    const todayDate = getDateString(Date.now());
    return taskDate === todayDate;
  });
};

const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => {
    return task.isRepeated;
  });
};

const getDateString = (date) => {
  const temp = new Date(date);
  const year = temp.getFullYear();
  const month = temp.getMonth();
  const day = temp.getDate();
  return `${day} ${month} ${year}`;
};

export default Board;
