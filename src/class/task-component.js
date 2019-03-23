import {renderCard} from "../components/card";
import TaskModel from "./task-model";
import TaskEditor from "./task-editor";

class TaskComponent extends TaskModel {
  constructor(data, onEditorOpening, onTaskUpdate, onTaskDelete) {
    super(data);
    this.cb = {
      onEditorOpening,
      onTaskUpdate,
      onTaskDelete
    };

    this._ref = null;
    this.openEditor = this.openEditor.bind(this);
    this.onEditorReset = this.onEditorReset.bind(this);
    this.onEditorSubmit = this.onEditorSubmit.bind(this);
    this.onEditorDelete = this.onEditorDelete.bind(this);
  }

  get template() {
    return renderCard(this);
  }

  openEditor(evt) {
    evt.stopPropagation();
    this.cb.onEditorOpening();
    // this.board.tasks.forEach((point) => {
    //   point.closeEditor();
    // });
    this.editor = new TaskEditor(this, this.onEditorReset, this.onEditorSubmit, this.onEditorDelete);

    const editorRef = this.editor.render();
    const cardRef = this._ref;
    const container = cardRef.parentNode;
    container.replaceChild(editorRef, cardRef);
  }

  onEditorReset() {
    this.closeEditor();
  }

  onEditorSubmit(rawData) {
    // this.update(data);
    // this.closeEditor();
    this.cb.onTaskUpdate(rawData, this.index, this);
  }

  onError() {
    this.editor.onError();
  }
  // onEditorDelete() {
  //   this.cb.onTaskDelete(this;
  // }

  onEditorDelete() {
    this.cb.onTaskDelete(this.index, this);
  }

  closeEditor() {
    if (!this.editor) {
      return;
    }

    const editorRef = this.editor.reference;
    const cardRef = this._ref;
    const container = editorRef.parentNode;
    container.replaceChild(cardRef, editorRef);

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

  // update(data) {
  //   this.cb.onTaskUpdate(this.raw, this.index);
  //   // this.updateModel(data);
  //   this.closeEditor();
  // }

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
