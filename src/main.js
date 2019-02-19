'use strict';
const filterSection = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const colorList = [`black`, `yellow`, `blue`, `green`, `pink`];
const daysList = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

function renderFilter(data) {
  const {id, name, count, checked = false, disabled = false} = data;
  const template = document.createElement(`template`);

  const input = `
  <input
    type="radio"
    id="${id}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked ? `checked` : ``}
    ${disabled ? `disabled` : ``}
  />`;

  const label = `
  <label for="${id}" class="filter__label">
    ${name} <span class="${id}-count">${count}</span></label
  >`;

  template.innerHTML = input + label;
  filterSection.appendChild(template.content);
}

const filtersList = [
  {
    id: `filter__all`,
    name: `ALL`,
    count: 15,
    checked: true
  },
  {
    id: `filter__overdue`,
    name: `OVERDUE`,
    count: 0,
    disabled: true
  },
  {
    id: `filter__today`,
    name: `TODAY`,
    count: 0,
    disabled: true
  },
  {
    id: `filter__favorites`,
    name: `FAVORITES`,
    count: 7
  },
  {
    id: `filter__repeating`,
    name: `Repeating`,
    count: 2
  },
  {
    id: `filter__tags`,
    name: `Tags`,
    count: 6
  },
  {
    id: `filter__archive`,
    name: `ARCHIVE`,
    count: 115
  },
];

function renderCard(data) {
  const {color, text, img, hashtags = [], date, repeat, edit, id} = data;
  const template = document.createElement(`template`);
  const card = {};
  const repeatCheck = repeat ? repeat : {};

  card.control = `
  <div class="card__control">
    <button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive">
      archive
    </button>
    <button
      type="button"
      class="card__btn card__btn--favorites card__btn--disabled"
    >
      favorites
    </button>
  </div>
  `;

  card.controlBar = `
  <div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>
  `;

  card.textArea = `
  <div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text"
      >${text}</textarea>
    </label>
  </div>
  `;

  const settings = {};

  settings.details = `
  <div class="card__details">
    <div class="card__dates">
      <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${date ? `YES` : `NO`}</span>
      </button>

      <fieldset class="card__date-deadline" ${date ? `` : `disabled`}>
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="23 September"
            name="date"
            ${date ? `value="${date.day}"` : ``}
          />
        </label>
        <label class="card__input-deadline-wrap">
          <input
            class="card__time"
            type="text"
            placeholder="11:15 PM"
            name="time"
            ${date ? `value="${date.time}"` : ``}
          />
        </label>
      </fieldset>

      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${repeat ? `YES` : `NO`}</span>
      </button>

      <fieldset class="card__repeat-days" ${repeat ? `` : `disabled`}>
        <div class="card__repeat-days-inner">
          ${daysList.map((day) => `
            <input
              class="visually-hidden card__repeat-day-input"
              type="checkbox"
              id="repeat-${day}-${id}"
              name="repeat"
              value=${day}
              ${repeatCheck[day] ? `checked` : ``}
            />
            <label class="card__repeat-day" for="repeat-${day}-${id}"
              >${day}</label
            >
          `).join(``)}
        </div>
      </fieldset>
    </div>

    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${hashtags.map((hashtag) => `
          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #${hashtag}
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>
        `).join(``)}
      </div>

      <label>
        <input
          type="text"
          class="card__hashtag-input"
          name="hashtag-input"
          placeholder="Type new hashtag here"
        />
      </label>
    </div>
  </div>
  `;

  settings.img = `
  <label class="card__img-wrap ${img ? `` : `card__img-wrap--empty`}">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${img ? img : `img/add-photo.svg`}"
      alt="task picture"
      class="card__img"
    />
  </label>
  `;

  settings.colors = `
  <div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
    <div class="card__colors-wrap">
      ${colorList.map((el) => `
        <input
          type="radio"
          id="color-${el}-${id}"
          class="card__color-input card__color-input--${el} visually-hidden"
          name="color"
          value=${el}
          ${color === el ? `checked` : ``}
        />
        <label
          for="color-${el}-${id}"
          class="card__color card__color--${el}"
          >${el}</label
        >
      `).join(``)}
    </div>
  </div>
  `;

  card.settings = `
  <div class="card__settings">
    ${settings.details}
    ${settings.img}
    ${settings.colors}
  </div>
  `;

  card.statusBtns = `
  <div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>
  `;

  const content = `
  <article class="card ${edit ? `card--edit` : ``} ${repeat ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        ${card.control}
        ${card.controlBar}
        ${card.textArea}
        ${card.settings}
        ${card.statusBtns}
      </div>
    </form>
  </article>
  `;

  template.innerHTML = content;
  tasksContainer.appendChild(template.content);
}

const testTask = {
  color: `black`,
  text: `asd`,
  hashtags: [`repeat`, `cinema`],
  id: Math.floor(100 * Math.random()),
  edit: true,
  repeat: {
    [daysList[0]]: true
  }
};

function changeTasks(number) {
  tasksContainer.innerHTML = ``;
  const rand = !isNaN(+number) ? number : Math.floor(4 * Math.random()) + 1;
  for (let i = 0; i < rand; i++) {
    renderCard(testTask);
  }
}

filterSection.innerHTML = ``;
filtersList.forEach((filter) => renderFilter(filter));
document.querySelectorAll(`.filter__input`).forEach((filter) => {
  filter.addEventListener(`change`, changeTasks);
});

window.onload = changeTasks(7);

