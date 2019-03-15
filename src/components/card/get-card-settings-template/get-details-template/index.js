import getDatesTemplate from './get-dates-template';
import getTagsTemplate from './get-tags-template';

const getDetailsTemplate = (data) => {
  const div = document.createElement(`div`);
  div.classList.add(`card__details`);

  div.appendChild(getDatesTemplate(data));
  div.appendChild(getTagsTemplate(data));
  return div;
};

export default getDetailsTemplate;
