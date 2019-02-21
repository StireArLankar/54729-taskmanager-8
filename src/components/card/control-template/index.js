function controlTemplate() {
  return `
  <div class="card__control">
    <button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive">
      archive
    </button>
    <button
      type="button"
      class="card__btn card__btn--favorites card__btn--disabled"
    >
      favorites
    </button>
  </div>
  `;
}

export default controlTemplate;
