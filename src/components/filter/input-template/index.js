function inputTemplate(id, checked, disabled) {
  return `
  <input
    type="radio"
    id="${id}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked ? `checked` : ``}
    ${disabled ? `disabled` : ``}
  />`;
}

export default inputTemplate;

