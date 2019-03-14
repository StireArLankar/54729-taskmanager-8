const getTagsTemplate = ({tags}) => {
  const hashtags = [...tags];
  const div = document.createElement(`div`);
  div.classList.add(`.card__hashtag`);

  div.innerHTML = `
    <div class="card__hashtag-list">
      ${hashtags.map((tag) => `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${tag}"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `).join(``)}

      <label>
        <input
          type="text"
          class="card__hashtag-input"
          name="hashtag-input"
          placeholder="Type new hashtag here"
        />
      </label>
    </div>
  `;

  const deleteTag = (evt) => {
    const parent = evt.target.parentNode;
    evt.target.removeEventListener(`click`, deleteTag);
    parent.remove();
  };

  const onEnterDown = (evt) => {
    evt.stopPropagation();
    if (evt.keyCode === 13) {
      addTag(evt);
    }
  };

  const tagsListElem = div.querySelector(`.card__hashtag-list`);
  const addTag = (evt) => {
    const value = evt.target.value;
    const span = document.createElement(`span`);
    span.classList.add(`card__hashtag-inner`);
    span.innerHTML = `
      <input
        type="hidden"
        name="hashtag"
        value="${value}"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${value}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    `;
    span.querySelector(`.card__hashtag-delete`).addEventListener(`click`, deleteTag);
    tagsListElem.insertBefore(span, tagsListElem.childNodes[0]);
  };

  const tagInput = div.querySelector(`.card__hashtag-input`);
  tagInput.addEventListener(`keydown`, onEnterDown);

  const delBtns = div.querySelectorAll(`.card__hashtag-delete`);
  delBtns.forEach((btn) => {
    btn.addEventListener(`click`, deleteTag);
  });

  return div;
};

export default getTagsTemplate;
