import {renderCard} from "../components/card";
import TaskModel from "./task-model";
import TaskEditor from "./task-editor";

class TaskComponent extends TaskModel {
  constructor(data, board) {
    super(data);
    this.board = board;

    this._ref = null;
    this.openEditor = this.openEditor.bind(this);
  }

  get template() {
    return renderCard(this);
  }

  openEditor(evt) {
    evt.stopPropagation();
    this.board.tasks.forEach((point) => {
      point.closeEditor();
    });
    this.editor = new TaskEditor(this);
    this.editor.render();
  }

  closeEditor() {
    if (!this.editor) {
      return;
    }
    this.editor.unrender();
    this.editor = null;
  }

  bind() {
    const editBtn = this._ref.querySelector(`.card__btn--edit`);
    editBtn.addEventListener(`click`, this.openEditor);
  }

  unbind() {
    const editBtn = this._ref.querySelector(`.card__btn--edit`);
    editBtn.removeEventListener(`click`, this.openEditor);
  }

  update(data) {
    this.updateModel(data);
    this.closeEditor();
    this.board.update();
  }

  unrender() {
    if (this._ref) {
      this.closeEditor();
      this.unbind();
      this._ref.remove();
      this._ref = null;
    }
  }
}

export default TaskComponent;
