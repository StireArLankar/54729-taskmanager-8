const getTextAreaTemplate = (text) => {
  return `
  <div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text"
      >${text}</textarea>
    </label>
  </div>
  `;
};

export default getTextAreaTemplate;
