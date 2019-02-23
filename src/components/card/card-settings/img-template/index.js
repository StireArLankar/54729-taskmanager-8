function imgTemplate(img) {
  return `
  <label class="card__img-wrap ${img ? `` : `card__img-wrap--empty`}">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${img ? img : `img/add-photo.svg`}"
      alt="task picture"
      class="card__img"
    />
  </label>
  `;
}

export default imgTemplate;
