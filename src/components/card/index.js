import getControlTemplate from './get-control-template';
import getControlBarTemplate from './get-control-bar-template';
import getTextareaTemplate from './get-textarea-template';
import getCardSettingsTemplate from './get-card-settings-template';
import getStatusBtnsTemplate from './get-status-btns-template';
import {tasksContainerName} from '../../containers';

const tasksContainer = document.querySelector(tasksContainerName);

const renderCard = (data) => {
  const {isRepeated, color} = data;
  const article = document.createElement(`article`);
  const articleClasses = [
    `card`,
    `${isRepeated ? `card--repeat` : null}`,
    `${`card--${color}`}`
  ];
  articleClasses.forEach((cls) => {
    if (cls) {
      article.classList.add(cls);
    }
  });

  const card = {};

  card.control = getControlTemplate();
  card.controlBar = getControlBarTemplate();
  card.textarea = getTextareaTemplate(data);
  card.settings = getCardSettingsTemplate(data);
  card.statusBtns = getStatusBtnsTemplate();

  article.innerHTML = `
    <form class="card__form" method="get">
      <div class="card__inner">
        ${card.control}
        ${card.controlBar}
        ${card.textarea}
        ${card.settings}
        ${card.statusBtns}
      </div>
    </form>
  `;

  return article;
};

const renderCardEditor = (data) => {
  const {isRepeated, color} = data;
  const article = document.createElement(`article`);
  const articleClasses = [
    `card`,
    `card--edit`,
    `${isRepeated ? `card--repeat` : null}`,
    `${`card--${color}`}`
  ];
  articleClasses.forEach((cls) => {
    if (cls) {
      article.classList.add(cls);
    }
  });

  const card = {};

  card.control = getControlTemplate();
  card.controlBar = getControlBarTemplate();
  card.textarea = getTextareaTemplate(data);
  card.settings = getCardSettingsTemplate(data);
  card.statusBtns = getStatusBtnsTemplate();

  article.innerHTML = `
    <form class="card__form" method="get">
      <div class="card__inner">
        ${card.control}
        ${card.controlBar}
        ${card.textarea}
        ${card.settings}
        ${card.statusBtns}
      </div>
    </form>
  `;

  return article;
};

const changeTasks = (tasks) => {
  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    fragment.appendChild(task.render());
  });
  clearElement(tasksContainer);
  tasksContainer.appendChild(fragment);
};

const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

export {renderCard, renderCardEditor, changeTasks};
