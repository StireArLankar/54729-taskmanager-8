import {renderCardEditor} from "../components/card";
import Component from './component';
import flatpickr from "flatpickr";

class TaskEditor extends Component {
  constructor(task) {
    super();
    this.task = task;

    this._ref = null;
    this._form = null;
    this._flatDate = null;
    this._flatTime = null;

    this.onEscDown = this.onEscDown.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  get template() {
    return renderCardEditor(this.task);
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
    this.task.closeEditor();
  }

  getDataFromForm() {
    return formDataConverter(this._form, this.task);
  }

  submitChanges(evt) {
    evt.preventDefault();
    const data = this.getDataFromForm();
    this.task.update(data);
    this.task.closeEditor();
  }

  render() {
    const card = this.task.reference;
    const container = card.parentNode;
    this._ref = this.template;

    this._form = this._ref.querySelector(`form`);

    this.bind();

    container.replaceChild(this._ref, card);
    return this._ref;
  }

  unrender() {
    const card = this.task.reference;
    const container = this._ref.parentNode;

    container.replaceChild(card, this._ref);

    this.unbind();
    this._flatDate = null;
    this._flatTime = null;
    this._ref = null;
  }

  bind() {
    document.addEventListener(`keydown`, this.onEscDown);
    document.addEventListener(`click`, this.onOutsideClick);
    this._form.addEventListener(`submit`, preventDefault);
    this._form.querySelector(`.card__save`).addEventListener(`click`, this.submitChanges);

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
    this._form.querySelector(`.card__save`).removeEventListener(`click`, this.submitChanges);
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

  const [day, month, year] = object.date.split(`-`);
  const [hour, min] = object.time.split(`:`);
  const date = new Date(year, month, day, hour, min);

  const repeatCheckboxes = form.querySelectorAll(`.card__repeat-day-input`);
  const repeatCheck = [...repeatCheckboxes].map((day_) => {
    return {
      value: day_.value,
      checked: day_.checked
    };
  });
  const repeatingDays = repeatCheck.reduce((acc, check) => {
    acc[check.value] = check.checked;
    return acc;
  }, {});

  const tagsInputs = form.querySelectorAll(`.card__hashtag-hidden-input`);
  const tags = [...tagsInputs].map((input) => input.value);

  const data = {
    title: object.text,
    dueDate: Number(date),
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
