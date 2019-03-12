import {renderCard} from "../components/card";
import {tasksContainerName} from '../containers';
import TastConstructor from './task-constructor';

const tasksContainer = document.querySelector(tasksContainerName);
class Task extends TastConstructor {
  constructor(data) {
    super(data);

    this.state.isEditing = false;

    this._ref = null;
    this._form = null;

    this.onEscDown = this.onEscDown.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  onEscDown(evt) {
    if (evt.keyCode === 27) {
      this.resetChanges();
    }
  }

  onOutsideClick(evt) {
    if (!evt.path.includes(this._form)) {
      this.resetChanges();
    }
  }

  resetChanges() {
    this.setEditing(false);
  }

  setEditing(check) {
    this.state.isEditing = check;
    if (check) {
      this._ref.classList.add(`card--edit`);
      this.addEditingListeners();
    } else {
      this._ref.classList.remove(`card--edit`);
      this.removeEditingListeners();
    }
  }

  addEditingListeners() {
    document.addEventListener(`keydown`, this.onEscDown);
    document.addEventListener(`click`, this.onOutsideClick);
  }

  removeEditingListeners() {
    document.removeEventListener(`keydown`, this.onEscDown);
    document.removeEventListener(`click`, this.onOutsideClick);
  }

  submitChanges(evt) {
    this.setEditing(false);
    evt.preventDefault();
  }

  addListeners() {
    const editBtn = this._ref.querySelector(`.card__btn--edit`);
    editBtn.addEventListener(`click`, () => {
      this.setEditing(true);
    });
    this._form.addEventListener(`submit`, this.submitChanges);
  }

  render() {
    this._ref = renderCard(this);
    this._form = this._ref.querySelector(`.card__form`);
    this.addListeners();
  }

  unrender() {
    tasksContainer.removeChild(this._ref);
    this._ref = null;
    this._form = null;
  }
}

export default Task;
