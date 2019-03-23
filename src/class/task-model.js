import Component from './component';
class TaskModel extends Component {
  constructor(data) {
    super();
    this._data = {
      title: data[`title`],
      dueDate: new Date(data[`due_date`]),
      tags: toUniqueArray(data[`tags`]),
      picture: data[`picture`],
      color: data[`color`],
      repeatingDays: data[`repeating_days`],
      index: data[`id`],
      isDone: Boolean(data[`is_done`]),
      isFavourite: Boolean(data[`is_favorite`])
    };
  }

  static raw(data) {
    return {
      'id': data.index,
      'title': data.title,
      'due_date': new Date(data.dueDate),
      'tags': data.tags,
      'picture': data.picture,
      'repeating_days': data.repeatingDays,
      'color': data.color,
      'is_favorite': data.isFavourite,
      'is_done': data.isDone,
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

const toUniqueArray = (array) => {
  const temp = new Set(array);
  return [...temp];
};

export default TaskModel;
