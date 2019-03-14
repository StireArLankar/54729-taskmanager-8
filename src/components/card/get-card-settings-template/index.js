import getDetailsTemplate from './get-details-template';
import getImgTemplate from './get-img-template';
import getColorsTemplate from './get-colors-template';

const getCardSettingsTemplate = (data) => {
  const div = document.createElement(`div`);
  div.classList.add(`card__settings`);
  div.innerHTML = `
    ${getImgTemplate(data)}
    ${getColorsTemplate(data)}
  `;
  div.insertBefore(getDetailsTemplate(data), div.childNodes[0]);
  return div;
};

export default getCardSettingsTemplate;
