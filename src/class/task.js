import {renderCard} from "../components/card";
import {tasksContainerName} from '../containers';

const tasksContainer = document.querySelector(tasksContainerName);
class Task {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavourite, isDone}) {
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this.state = {
      isEditing: false,
      isDone,
      isFavourite
    };

    this._bind = {};
  }

  get title() {
    return this._title;
  }

  get dueDate() {
    return this._dueDate;
  }

  get tags() {
    return this._tags;
  }

  get picture() {
    return this._picture;
  }

  get color() {
    return this._color;
  }

  get repeatingDays() {
    return this._repeatingDays;
  }

  get isRepeated() {
    return Object.values(this.repeatingDays).some((it) => it === true);
  }

  _onEscDown(evt) {
    if (evt.keyCode === 27) {
      this._resetChanges();
    }
  }

  _bindedOnEscDown() {
    this._bind.onEscDown = this._bind.onEscDown || this._onEscDown.bind(this);
    return this._bind.onEscDown;
  }

  _stopProp(evt) {
    evt.stopPropagation();
  }

  _setEditingTrue() {
    this.state.isEditing = true;
    this._ref.classList.add(`card--edit`);
    document.addEventListener(`keydown`, this._bindedOnEscDown());
    document.addEventListener(`click`, this._bindedResetChanges());
    this._form.addEventListener(`click`, this._stopProp);
    this._form.addEventListener(`keydown`, this._stopProp);
  }

  _setEditingFalse() {
    this.state.isEditing = false;
    this._ref.classList.remove(`card--edit`);
    document.removeEventListener(`keydown`, this._bindedOnEscDown());
    document.removeEventListener(`click`, this._bindedResetChanges());
    this._form.removeEventListener(`click`, this._stopProp);
    this._form.removeEventListener(`keydown`, this._stopProp);
  }

  _submitEditingChanges(evt) {
    this._setEditingFalse();
    evt.preventDefault();
  }

  _resetChanges() {
    this._setEditingFalse();
  }

  _bindedResetChanges() {
    this._bind.resetChanges = this._bind.resetChanges || this._resetChanges.bind(this);
    return this._bind.resetChanges;
  }

  _addListeners() {
    const editBtn = this._ref.querySelector(`.card__btn--edit`);
    this._form = this._ref.querySelector(`.card__form`);
    editBtn.addEventListener(`click`, this._setEditingTrue.bind(this), true);
    this._form.addEventListener(`submit`, this._submitEditingChanges.bind(this));
  }

  render() {
    this._ref = renderCard(this);
    this._addListeners();
  }

  unrender() {
    tasksContainer.removeChild(this._ref);
    this._ref = null;
    this._form = null;
  }
}

export default Task;
