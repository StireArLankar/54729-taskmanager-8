class TaskModel {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavourite, isDone, index}) {
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
}

export default TaskModel;
