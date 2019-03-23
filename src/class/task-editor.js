import {renderCardEditor} from "../components/card";
import Component from './component';
import flatpickr from "flatpickr";
import TaskModel from './task-model';

class TaskEditor extends Component {
  constructor(data, onReset, onSubmit, onDelete) {
    super();
    this.data = data;
    this.cb = {
      onReset,
      onSubmit,
      onDelete
    };

    this._ref = null;
    this._form = null;
    this._flatDate = null;
    this._flatTime = null;

    this.onEscDown = this.onEscDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  get template() {
    return renderCardEditor(this.data);
  }

  onEscDown(evt) {
    if (evt.keyCode === 27) {
      this.resetChanges(evt);
    }
  }

  onOutsideClick(evt) {
    if (!evt.path.includes(this._form)) {
      this.resetChanges(evt);
    }
  }

  resetChanges(evt) {
    evt.preventDefault();
    this.cb.onReset();
  }

  onError() {
    this.shake();
    this.unblock();
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._ref.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._ref.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  block() {
    this._ref.querySelector(`.card__save`).disabled = false;
    this._ref.querySelector(`.card__text`).disabled = false;
  }

  unblock() {
    this._ref.querySelector(`.card__save`).disabled = true;
    this._ref.querySelector(`.card__text`).disabled = true;
  }

  getDataFromForm() {
    return formDataConverter(this._form, this.data);
  }

  onSubmit(evt) {
    evt.preventDefault();
    const data = this.getDataFromForm();
    const taskData = TaskModel.raw(data);
    this.block();
    this.cb.onSubmit(taskData);
  }

  onDelete(evt) {
    evt.preventDefault();
    this.block();
    this.cb.onDelete();
  }

  render() {
    this._ref = this.template;
    this._form = this._ref.querySelector(`form`);
    this.bind();
    return this._ref;
  }

  unrender() {
    this.unbind();
    this._flatDate = null;
    this._flatTime = null;
    this._ref = null;
  }

  bind() {
    document.addEventListener(`keydown`, this.onEscDown);
    document.addEventListener(`click`, this.onOutsideClick);
    this._form.addEventListener(`submit`, preventDefault);
    this._form.querySelector(`.card__save`).addEventListener(`click`, this.onSubmit);
    this._form.querySelector(`.card__delete`).addEventListener(`click`, this.onDelete);

    const dateInput = this._form.querySelector(`.card__date`);
    this._flatDate = flatpickr(dateInput, {
      altInput: true,
      altFormat: `j F`,
      dateFormat: `j-n-Y`
    });
    this._flatDate.calendarContainer.addEventListener(`click`, stopProp);

    const timeInput = this._form.querySelector(`.card__time`);
    this._flatTime = flatpickr(timeInput, {
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `H:i`,
      [`time_24hr`]: true
    });
    this._flatTime.calendarContainer.addEventListener(`click`, stopProp);
  }

  unbind() {
    document.removeEventListener(`keydown`, this.onEscDown);
    document.removeEventListener(`click`, this.onOutsideClick);
    this._form.removeEventListener(`submit`, preventDefault);
    this._form.querySelector(`.card__save`).removeEventListener(`click`, this.onSubmit);
    this._form.querySelector(`.card__delete`).removeEventListener(`click`, this.onDelete);
    this._form = null;
    this._flatDate.calendarContainer.removeEventListener(`click`, stopProp);
    this._flatTime.calendarContainer.removeEventListener(`click`, stopProp);
  }
}

const stopProp = (evt) => {
  evt.stopPropagation();
};

const preventDefault = (evt) => {
  evt.preventDefault();
};

const formDataConverter = (form, oldData) => {
  const formData = new FormData(form);
  const object = {};

  for (let pair of formData.entries()) {
    object[pair[0]] = pair[1];
  }

  let date;
  const dateFieldset = form.querySelector(`.card__date-deadline`);
  if (dateFieldset.disabled) {
    date = undefined;
  } else {
    const [day, month, year] = object.date.split(`-`);
    const [hour, min] = object.time.split(`:`);
    date = Number(new Date(year, month - 1, day, hour, min));
  }

  const repeatFieldset = form.querySelector(`.card__repeat-days`);
  let repeatingDays;
  if (repeatFieldset.disabled) {
    repeatingDays = {
      'mo': false,
      'tu': false,
      'we': false,
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    };
  } else {
    const repeatCheckboxes = form.querySelectorAll(`.card__repeat-day-input`);
    const repeatCheck = [...repeatCheckboxes].map((day_) => {
      return {
        value: day_.value,
        checked: day_.checked
      };
    });
    repeatingDays = repeatCheck.reduce((acc, check) => {
      acc[check.value] = check.checked;
      return acc;
    }, {});
  }

  const tagsInputs = form.querySelectorAll(`.card__hashtag-hidden-input`);
  const tags = [...tagsInputs].map((input) => input.value);

  const data = {
    title: object.text,
    dueDate: date,
    color: object.color,
    picture: oldData.picture,
    index: oldData.index,
    isDone: oldData.isDone,
    isFavourite: oldData.isFavourite,
    tags,
    repeatingDays
  };

  // console.log(data, oldData.data);

  return data;
};

export default TaskEditor;
