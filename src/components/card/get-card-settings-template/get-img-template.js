const getImgTemplate = ({picture}) => {
  return `
  <label class="card__img-wrap ${picture ? `` : `card__img-wrap--empty`}">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${picture ? picture : `img/add-photo.svg`}"
      alt="task picture"
      class="card__img"
    />
  </label>
  `;
};

export default getImgTemplate;
