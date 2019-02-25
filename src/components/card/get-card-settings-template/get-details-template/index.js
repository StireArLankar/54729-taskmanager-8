import getDatesTemplate from './get-dates-template';
import getTagsTemplate from './get-tags-template';

const getDetailsTemplate = (data) => {
  return `
  <div class="card__details">
    ${getDatesTemplate(data)}
    ${getTagsTemplate(data)}
  </div>
  `;
};

export default getDetailsTemplate;
