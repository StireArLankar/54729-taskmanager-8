const getTextAreaTemplate = ({title}) => {
  return `
  <div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text"
      >${title}</textarea>
    </label>
  </div>
  `;
};

export default getTextAreaTemplate;
