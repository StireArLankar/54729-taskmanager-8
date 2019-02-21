function labelTemplate(id, name, count) {
  return `
  <label for="${id}" class="filter__label">
    ${name} <span class="${id}-count">${count}</span></label
  >`;
}

export default labelTemplate;
