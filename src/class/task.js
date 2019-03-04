class Task {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavourite, isDone}) {
    this.title = title;
    this.dueDate = dueDate;
    this.tags = tags;
    this.picture = picture;
    this.color = color;
    this.repeatingDays = repeatingDays;
    this.isFavourite = isFavourite;
    this.isDone = isDone;

    this.isEditing = false;
  }
}

export default Task;
