const getInputTemplate = (id, checked, disabled, name) => {
  return `
  <input
    type="radio"
    id="${id}"
    class="filter__input visually-hidden"
    name="filter"
    value=${name}
    ${checked ? `checked` : ``}
    ${disabled ? `disabled` : ``}
  />`;
};

export default getInputTemplate;

