import Component from './component';
class TaskModel extends Component {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavourite, isDone, index}) {
    super();
    this._data = {
      title,
      dueDate,
      tags,
      picture,
      color,
      repeatingDays,
      index,
      isDone,
      isFavourite
    };
  }

  get data() {
    return this._data;
  }

  get title() {
    return this._data.title;
  }

  get dueDate() {
    return this._data.dueDate;
  }

  get tags() {
    return this._data.tags;
  }

  get picture() {
    return this._data.picture;
  }

  get color() {
    return this._data.color;
  }

  get repeatingDays() {
    return this._data.repeatingDays;
  }

  get isRepeated() {
    return Object.values(this.repeatingDays).some((isDayRepeated) => isDayRepeated === true);
  }

  get isDone() {
    return this._data.isDone;
  }

  get isFavourite() {
    return this._data.isFavourite;
  }

  get index() {
    return this._data.index;
  }

  updateModel(data) {
    this._data = data;
  }
}

export default TaskModel;
