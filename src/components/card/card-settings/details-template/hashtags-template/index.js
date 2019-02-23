function hashtagsTemplate(hashtags) {
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${hashtags.map((hashtag) => `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${hashtag}
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
  </div>
  `;
}

export default hashtagsTemplate;
