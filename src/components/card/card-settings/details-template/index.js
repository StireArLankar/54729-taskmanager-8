import datesTemplate from './dates-template';
import hashtagsTemplate from './hashtags-template';

function detailsTemplate(id, date, repeat, hashtags) {
  return `
  <div class="card__details">
    ${datesTemplate(id, date, repeat)}
    ${hashtagsTemplate(hashtags)}
  </div>
  `;
}

export default detailsTemplate;
