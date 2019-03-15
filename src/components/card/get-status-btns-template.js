const getStatusBtnsTemplate = () => {
  const div = document.createElement(`div`);
  div.classList.add(`card__status-btns`);
  div.innerHTML = `
    <button class="card__save" type="button">save</button>
    <button class="card__delete" type="button">delete</button>
  `;
  return div;
};

export default getStatusBtnsTemplate;
