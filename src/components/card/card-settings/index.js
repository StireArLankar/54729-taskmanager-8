import detailsTemplate from './details-template';
import imgTemplate from './img-template';
import colorsTemplate from './colors-template';

function cardSettings(id, date, repeat, hashtags, img, color) {
  return `
  <div class="card__settings">
    ${detailsTemplate(id, date, repeat, hashtags)}
    ${imgTemplate(img)}
    ${colorsTemplate(id, color)}
  </div>
  `;
}

export default cardSettings;
