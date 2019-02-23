import inputTemplate from './input-template';
import labelTemplate from './label-template';

const filterSection = document.querySelector(`.main__filter`);

function renderFilter(data) {
  const {id, name, count, checked = false, disabled = false} = data;
  const template = document.createElement(`template`);

  const input = inputTemplate(id, checked, disabled);
  const label = labelTemplate(id, name, count);

  template.innerHTML = input + label;
  filterSection.appendChild(template.content);
}

function clearFiltersSection() {
  filterSection.innerHTML = ``;
}

function addFiltersListener(callback) {
  document.querySelectorAll(`.filter__input`).forEach((filter) => {
    filter.addEventListener(`change`, callback);
  });
}

export {renderFilter, clearFiltersSection, addFiltersListener};
