import getControlTemplate from './get-control-template';
import getControlBarTemplate from './get-control-bar-template';
import getTextareaTemplate from './get-textarea-template';
import getCardSettingsTemplate from './get-card-settings-template';
import getStatusBtnsTemplate from './get-status-btns-template';

const tasksContainer = document.querySelector(`.board__tasks`);

function renderCard(data) {
  const {color, text, img, hashtags = [], date, repeat, edit, id} = data;
  const template = document.createElement(`template`);
  const card = {};

  card.control = getControlTemplate();
  card.controlBar = getControlBarTemplate();
  card.textArea = getTextareaTemplate(text);
  card.settings = getCardSettingsTemplate(id, date, repeat, hashtags, img, color);
  card.statusBtns = getStatusBtnsTemplate();

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
