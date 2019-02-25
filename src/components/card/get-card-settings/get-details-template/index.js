import getDatesTemplate from './get-dates-template';
import getHashtagsTemplate from './get-hasgtags-template';

const getDetailsTemplate = (id, date, repeat, hashtags) => {
  return `
  <div class="card__details">
    ${getDatesTemplate(id, date, repeat)}
    ${getHashtagsTemplate(hashtags)}
  </div>
  `;
};

export default getDetailsTemplate;
