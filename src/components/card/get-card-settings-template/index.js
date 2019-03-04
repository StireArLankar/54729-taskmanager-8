import getDetailsTemplate from './get-details-template';
import getImgTemplate from './get-img-template';
import getColorsTemplate from './get-colors-template';

const getCardSettingsTemplate = (data) => {
  return `
  <div class="card__settings">
    ${getDetailsTemplate(data)}
    ${getImgTemplate(data)}
    ${getColorsTemplate(data)}
  </div>
  `;
};

export default getCardSettingsTemplate;
