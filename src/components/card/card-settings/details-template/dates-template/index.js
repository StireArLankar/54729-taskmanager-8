import {daysList} from '../../../../../common';

function datesTemplate(id, date, repeat) {
  const repeatCheck = repeat ? repeat : {};
  return `
  <div class="card__dates">
    <button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${date ? `YES` : `NO`}</span>
    </button>

    <fieldset class="card__date-deadline" ${date ? `` : `disabled`}>
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder="23 September"
          name="date"
          ${date ? `value="${date.day}"` : ``}
        />
      </label>
      <label class="card__input-deadline-wrap">
        <input
          class="card__time"
          type="text"
          placeholder="11:15 PM"
          name="time"
          ${date ? `value="${date.time}"` : ``}
        />
      </label>
    </fieldset>

    <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${repeat ? `YES` : `NO`}</span>
    </button>

    <fieldset class="card__repeat-days" ${repeat ? `` : `disabled`}>
      <div class="card__repeat-days-inner">
        ${daysList.map((day) => `
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-${id}"
            name="repeat"
            value=${day}
            ${repeatCheck[day] ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-${id}"
            >${day}</label
          >
        `).join(``)}
      </div>
    </fieldset>
  </div>
  `;
}

export default datesTemplate;
