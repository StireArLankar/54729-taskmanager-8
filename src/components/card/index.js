import controlTemplate from './control-template';
import controlBarTemplate from './control-bar-template';
import textAreaTemplate from './text-area-template';
import cardSettings from './card-settings';
import statusBtnsTemplate from './status-btns-template';

const tasksContainer = document.querySelector(`.board__tasks`);

function renderCard(data) {
  const {color, text, img, hashtags = [], date, repeat, edit, id} = data;
  const template = document.createElement(`template`);
  const card = {};

  card.control = controlTemplate();
  card.controlBar = controlBarTemplate();
  card.textArea = textAreaTemplate(text);
  card.settings = cardSettings(id, date, repeat, hashtags, img, color);
  card.statusBtns = statusBtnsTemplate();

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

function changeTasks(task, number) {
  tasksContainer.innerHTML = ``;
  const rand = !isNaN(+number) ? number : Math.floor(4 * Math.random()) + 1;
  for (let i = 0; i < rand; i++) {
    renderCard(task);
  }
}

export {renderCard, changeTasks};
