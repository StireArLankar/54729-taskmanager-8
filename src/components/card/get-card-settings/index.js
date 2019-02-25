import getDetailsTemplate from './get-details-template';
import getImgTemplate from './get-img-template';
import getColorsTemplate from './get-colors-template';

const getCardSettingsTemplate = (id, date, repeat, hashtags, img, color) => {
  return `
  <div class="card__settings">
    ${getDetailsTemplate(id, date, repeat, hashtags)}
    ${getImgTemplate(img)}
    ${getColorsTemplate(id, color)}
  </div>
  `;
};

export default getCardSettingsTemplate;
