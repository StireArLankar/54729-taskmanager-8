import {daysList} from '../../../../common';

const getDatesTemplate = ({index, dueDate, repeatingDays, isRepeated}) => {
  const date = dueDate ? new Date(dueDate) : undefined;

  const div = document.createElement(`div`);
  div.classList.add(`card__dates`);
  div.innerHTML = `
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
          placeholder="11:15"
          name="time"
          ${date ? `value="${printTime(date)}"` : ``}
        />
      </label>
    </fieldset>

    <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isRepeated ? `YES` : `NO`}</span>
    </button>

    <fieldset class="card__repeat-days" ${isRepeated ? `` : `disabled`}>
      <div class="card__repeat-days-inner">
        ${daysList.map((day) => `
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-${index}"
            name="repeat"
            value=${day}
            ${repeatingDays[day] ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-${index}"
            >${day}</label
          >
        `).join(``)}
      </div>
    </fieldset>
  `;

  const toggleRepeating = div.querySelector(`.card__repeat-toggle`);
  const updateRepeating = () => {
    const span = toggleRepeating.querySelector(`.card__repeat-status`);
    const fieldset = div.querySelector(`.card__repeat-days`);
    if (span.textContent === `YES`) {
      span.textContent = `NO`;
      fieldset.disabled = true;
      fieldset.style.display = `none`;
    } else {
      span.textContent = `YES`;
      fieldset.disabled = false;
      fieldset.style.display = `block`;
    }
  };
  toggleRepeating.addEventListener(`click`, updateRepeating);

  const toggleDate = div.querySelector(`.card__date-deadline-toggle`);
  const updateDate = () => {
    const span = toggleDate.querySelector(`.card__date-status`);
    const fieldset = div.querySelector(`.card__date-deadline`);
    if (span.textContent === `YES`) {
      span.textContent = `NO`;
      fieldset.disabled = true;
      fieldset.style.display = `none`;
    } else {
      span.textContent = `YES`;
      fieldset.disabled = false;
      fieldset.style.display = `block`;
    }
  };
  toggleDate.addEventListener(`click`, updateDate);

  return div;
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
