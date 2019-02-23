import {colorList} from '../../../../common';

function colorsTemplate(id, color) {
  return `
  <div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
    <div class="card__colors-wrap">
      ${colorList.map((el) => `
        <input
          type="radio"
          id="color-${el}-${id}"
          class="card__color-input card__color-input--${el} visually-hidden"
          name="color"
          value=${el}
          ${color === el ? `checked` : ``}
        />
        <label
          for="color-${el}-${id}"
          class="card__color card__color--${el}"
          >${el}</label
        >
      `).join(``)}
    </div>
  </div>
  `;
}

export default colorsTemplate;
