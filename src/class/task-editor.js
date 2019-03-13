import {renderCardEditor} from "../components/card";
import Component from './component';

class TaskEditor extends Component {
  constructor(task) {
    super();
    this.task = task;

    this._ref = null;
    this._form = null;

    this.onEscDown = this.onEscDown.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  get template() {
    return renderCardEditor(this.task.model);
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

  submitChanges(evt) {
    evt.preventDefault();
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
    this._ref = null;
  }

  bind() {
    document.addEventListener(`keydown`, this.onEscDown);
    document.addEventListener(`click`, this.onOutsideClick);
    this._form.addEventListener(`submit`, this.submitChanges);
  }

  unbind() {
    document.removeEventListener(`keydown`, this.onEscDown);
    document.removeEventListener(`click`, this.onOutsideClick);
    this._form.removeEventListener(`submit`, this.submitChanges);
    this._form = null;
  }
}

export default TaskEditor;
