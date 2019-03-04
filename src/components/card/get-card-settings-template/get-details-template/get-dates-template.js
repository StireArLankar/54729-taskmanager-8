import {daysList} from '../../../../common';

const getDatesTemplate = ({index, dueDate, repeatingDays}) => {
  const repeatCheck = repeatingDays ? repeatingDays : {};
  const date = dueDate ? new Date(dueDate) : undefined;
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
          ${date ? `value="${printDate(date)}"` : ``}
        />
      </label>
      <label class="card__input-deadline-wrap">
        <input
          class="card__time"
          type="text"
          placeholder="11:15 PM"
          name="time"
          ${date ? `value="${printTime(date)}"` : ``}
        />
      </label>
    </fieldset>

    <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${repeatingDays ? `YES` : `NO`}</span>
    </button>

    <fieldset class="card__repeat-days" ${repeatingDays ? `` : `disabled`}>
      <div class="card__repeat-days-inner">
        ${daysList.map((day) => `
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-${index}"
            name="repeat"
            value=${day}
            ${repeatCheck[day] ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-${index}"
            >${day}</label
          >
        `).join(``)}
      </div>
    </fieldset>
  </div>
  `;
};

const printDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
};

const printTime = (date) => {
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${addPrettyZeros(hour)}:${addPrettyZeros(min)}`;
};

const addPrettyZeros = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

export default getDatesTemplate;
