import getControlTemplate from './get-control-template';
import getControlBarTemplate from './get-control-bar-template';
import getTextareaTemplate from './get-textarea-template';
import getCardSettingsTemplate from './get-card-settings-template';
import getStatusBtnsTemplate from './get-status-btns-template';

const tasksContainer = document.querySelector(`.board__tasks`);

const renderCard = (data) => {
  const {repeatingDays, isEditing, color} = data;
  const template = document.createElement(`template`);
  const card = {};

  card.control = getControlTemplate();
  card.controlBar = getControlBarTemplate();
  card.textarea = getTextareaTemplate(data);
  card.settings = getCardSettingsTemplate(data);
  card.statusBtns = getStatusBtnsTemplate();

  const content = `
  <article class="card ${isEditing ? `card--edit` : ``} ${repeatingDays === {} || repeatingDays ? `card--repeat` : ``} ${`card--${color}`}">
    <form class="card__form" method="get">
      <div class="card__inner">
        ${card.control}
        ${card.controlBar}
        ${card.textarea}
        ${card.settings}
        ${card.statusBtns}
      </div>
    </form>
  </article>
  `;

  template.innerHTML = content;
  tasksContainer.appendChild(template.content);
};

const changeTasks = (tasks) => {
  tasksContainer.innerHTML = ``;
  tasks.forEach((task) => renderCard(task));
};

export {renderCard, changeTasks};
