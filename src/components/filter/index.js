import getInputTemplate from './get-input-template';
import getLabelTemplate from './get-label-template';

const filterSection = document.querySelector(`.main__filter`);

const renderFilter = (data) => {
  const {id, name, count, checked = false, disabled = false} = data;
  const template = document.createElement(`template`);

  const input = getInputTemplate(id, checked, disabled);
  const label = getLabelTemplate(id, name, count);

  template.innerHTML = input + label;
  filterSection.appendChild(template.content);
};

const clearFiltersSection = () => {
  filterSection.innerHTML = ``;
};

const addFiltersListener = (callback) => {
  document.querySelectorAll(`.filter__input`).forEach((filter) => {
    filter.addEventListener(`change`, callback);
  });
};

export {renderFilter, clearFiltersSection, addFiltersListener};
