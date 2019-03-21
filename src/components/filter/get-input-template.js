const getInputTemplate = (id, checked, count, name) => {
  return `
  <input
    type="radio"
    id="${id}"
    class="filter__input visually-hidden"
    name="filter"
    value=${name}
    ${checked ? `checked` : ``}
    ${count === 0 ? `disabled` : ``}
  />`;
};

export default getInputTemplate;

