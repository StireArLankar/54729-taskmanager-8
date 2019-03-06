/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/task.js":
/*!***************************!*\
  !*** ./src/class/task.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/card */ "./src/components/card/index.js");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../containers */ "./src/containers/index.js");


const tasksContainer = document.querySelector(_containers__WEBPACK_IMPORTED_MODULE_1__["tasksContainerName"]);

class Task {
  constructor({
    title,
    dueDate,
    tags,
    picture,
    color,
    repeatingDays,
    isFavourite,
    isDone
  }) {
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this.state = {
      isEditing: false,
      isDone,
      isFavourite
    };
    this._bind = {};
  }

  get title() {
    return this._title;
  }

  get dueDate() {
    return this._dueDate;
  }

  get tags() {
    return this._tags;
  }

  get picture() {
    return this._picture;
  }

  get color() {
    return this._color;
  }

  get repeatingDays() {
    return this._repeatingDays;
  }

  get isRepeated() {
    return Object.values(this.repeatingDays).some(it => it === true);
  }

  _onEscDown(evt) {
    if (evt.keyCode === 27) {
      this._resetChanges();
    }
  }

  _bindedOnEscDown() {
    this._bind.onEscDown = this._bind.onEscDown || this._onEscDown.bind(this);
    return this._bind.onEscDown;
  }

  _stopProp(evt) {
    evt.stopPropagation();
  }

  _setEditingTrue() {
    this.state.isEditing = true;

    this._ref.classList.add(`card--edit`);

    document.addEventListener(`keydown`, this._bindedOnEscDown());
    document.addEventListener(`click`, this._bindedResetChanges());

    this._form.addEventListener(`click`, this._stopProp);

    this._form.addEventListener(`keydown`, this._stopProp);
  }

  _setEditingFalse() {
    this.state.isEditing = false;

    this._ref.classList.remove(`card--edit`);

    document.removeEventListener(`keydown`, this._bindedOnEscDown());
    document.removeEventListener(`click`, this._bindedResetChanges());

    this._form.removeEventListener(`click`, this._stopProp);

    this._form.removeEventListener(`keydown`, this._stopProp);
  }

  _submitEditingChanges(evt) {
    this._setEditingFalse();

    evt.preventDefault();
  }

  _resetChanges() {
    this._setEditingFalse();
  }

  _bindedResetChanges() {
    this._bind.resetChanges = this._bind.resetChanges || this._resetChanges.bind(this);
    return this._bind.resetChanges;
  }

  _addListeners() {
    const editBtn = this._ref.querySelector(`.card__btn--edit`);

    this._form = this._ref.querySelector(`.card__form`);
    editBtn.addEventListener(`click`, this._setEditingTrue.bind(this), false);

    this._form.addEventListener(`submit`, this._submitEditingChanges.bind(this));
  }

  render() {
    this._ref = Object(_components_card__WEBPACK_IMPORTED_MODULE_0__["renderCard"])(this);

    this._addListeners();
  }

  unrender() {
    tasksContainer.removeChild(this._ref);
    this._ref = null;
    this._form = null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Task);

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/*! exports provided: colorList, daysList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorList", function() { return colorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daysList", function() { return daysList; });
const colorList = [`black`, `yellow`, `blue`, `green`, `pink`];
const daysList = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];


/***/ }),

/***/ "./src/components/card/get-card-settings-template/get-colors-template.js":
/*!*******************************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/get-colors-template.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common */ "./src/common/index.js");


const getColorsTemplate = ({
  index,
  color
}) => {
  return `
  <div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
    <div class="card__colors-wrap">
      ${_common__WEBPACK_IMPORTED_MODULE_0__["colorList"].map(el => `
        <input
          type="radio"
          id="color-${el}-${index}"
          class="card__color-input card__color-input--${el} visually-hidden"
          name="color"
          value=${el}
          ${color === el ? `checked` : ``}
        />
        <label
          for="color-${el}-${index}"
          class="card__color card__color--${el}"
          >${el}</label
        >
      `).join(``)}
    </div>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getColorsTemplate);

/***/ }),

/***/ "./src/components/card/get-card-settings-template/get-details-template/get-dates-template.js":
/*!***************************************************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/get-details-template/get-dates-template.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../common */ "./src/common/index.js");


const getDatesTemplate = ({
  index,
  dueDate,
  repeatingDays
}) => {
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
        ${_common__WEBPACK_IMPORTED_MODULE_0__["daysList"].map(day => `
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

const printDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
};

const printTime = date => {
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${addPrettyZeros(hour)}:${addPrettyZeros(min)}`;
};

const addPrettyZeros = number => {
  return number < 10 ? `0${number}` : `${number}`;
};

/* harmony default export */ __webpack_exports__["default"] = (getDatesTemplate);

/***/ }),

/***/ "./src/components/card/get-card-settings-template/get-details-template/get-tags-template.js":
/*!**************************************************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/get-details-template/get-tags-template.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getTagsTemplate = ({
  tags
}) => {
  const hashtags = [...tags];
  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${hashtags.map(tag => `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `).join(``)}

      <label>
        <input
          type="text"
          class="card__hashtag-input"
          name="hashtag-input"
          placeholder="Type new hashtag here"
        />
      </label>
    </div>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getTagsTemplate);

/***/ }),

/***/ "./src/components/card/get-card-settings-template/get-details-template/index.js":
/*!**************************************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/get-details-template/index.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_dates_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-dates-template */ "./src/components/card/get-card-settings-template/get-details-template/get-dates-template.js");
/* harmony import */ var _get_tags_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-tags-template */ "./src/components/card/get-card-settings-template/get-details-template/get-tags-template.js");



const getDetailsTemplate = data => {
  return `
  <div class="card__details">
    ${Object(_get_dates_template__WEBPACK_IMPORTED_MODULE_0__["default"])(data)}
    ${Object(_get_tags_template__WEBPACK_IMPORTED_MODULE_1__["default"])(data)}
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getDetailsTemplate);

/***/ }),

/***/ "./src/components/card/get-card-settings-template/get-img-template.js":
/*!****************************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/get-img-template.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getImgTemplate = ({
  picture
}) => {
  return `
  <label class="card__img-wrap ${picture ? `` : `card__img-wrap--empty`}">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${picture ? picture : `img/add-photo.svg`}"
      alt="task picture"
      class="card__img"
    />
  </label>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getImgTemplate);

/***/ }),

/***/ "./src/components/card/get-card-settings-template/index.js":
/*!*****************************************************************!*\
  !*** ./src/components/card/get-card-settings-template/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_details_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-details-template */ "./src/components/card/get-card-settings-template/get-details-template/index.js");
/* harmony import */ var _get_img_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-img-template */ "./src/components/card/get-card-settings-template/get-img-template.js");
/* harmony import */ var _get_colors_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-colors-template */ "./src/components/card/get-card-settings-template/get-colors-template.js");




const getCardSettingsTemplate = data => {
  return `
  <div class="card__settings">
    ${Object(_get_details_template__WEBPACK_IMPORTED_MODULE_0__["default"])(data)}
    ${Object(_get_img_template__WEBPACK_IMPORTED_MODULE_1__["default"])(data)}
    ${Object(_get_colors_template__WEBPACK_IMPORTED_MODULE_2__["default"])(data)}
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getCardSettingsTemplate);

/***/ }),

/***/ "./src/components/card/get-control-bar-template.js":
/*!*********************************************************!*\
  !*** ./src/components/card/get-control-bar-template.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getControlBarTemplate = () => {
  return `
  <div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getControlBarTemplate);

/***/ }),

/***/ "./src/components/card/get-control-template.js":
/*!*****************************************************!*\
  !*** ./src/components/card/get-control-template.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getControlTemplate = () => {
  return `
  <div class="card__control">
    <button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive">
      archive
    </button>
    <button
      type="button"
      class="card__btn card__btn--favorites card__btn--disabled"
    >
      favorites
    </button>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getControlTemplate);

/***/ }),

/***/ "./src/components/card/get-status-btns-template.js":
/*!*********************************************************!*\
  !*** ./src/components/card/get-status-btns-template.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getStatusBtnsTemplate = () => {
  return `
  <div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getStatusBtnsTemplate);

/***/ }),

/***/ "./src/components/card/get-textarea-template.js":
/*!******************************************************!*\
  !*** ./src/components/card/get-textarea-template.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getTextAreaTemplate = ({
  title
}) => {
  return `
  <div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text"
      >${title}</textarea>
    </label>
  </div>
  `;
};

/* harmony default export */ __webpack_exports__["default"] = (getTextAreaTemplate);

/***/ }),

/***/ "./src/components/card/index.js":
/*!**************************************!*\
  !*** ./src/components/card/index.js ***!
  \**************************************/
/*! exports provided: renderCard, changeTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCard", function() { return renderCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTasks", function() { return changeTasks; });
/* harmony import */ var _get_control_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-control-template */ "./src/components/card/get-control-template.js");
/* harmony import */ var _get_control_bar_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-control-bar-template */ "./src/components/card/get-control-bar-template.js");
/* harmony import */ var _get_textarea_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-textarea-template */ "./src/components/card/get-textarea-template.js");
/* harmony import */ var _get_card_settings_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-card-settings-template */ "./src/components/card/get-card-settings-template/index.js");
/* harmony import */ var _get_status_btns_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-status-btns-template */ "./src/components/card/get-status-btns-template.js");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers */ "./src/containers/index.js");






const tasksContainer = document.querySelector(_containers__WEBPACK_IMPORTED_MODULE_5__["tasksContainerName"]);

const renderCard = data => {
  const {
    isRepeated,
    state: {
      isEditing
    },
    color
  } = data;
  const article = document.createElement(`article`);
  const articleClasses = [`card`, `${isEditing ? `card--edit` : null}`, `${isRepeated ? `card--repeat` : null}`, `${`card--${color}`}`];
  articleClasses.forEach(cls => {
    if (cls) {
      article.classList.add(cls);
    }
  });
  const card = {};
  card.control = Object(_get_control_template__WEBPACK_IMPORTED_MODULE_0__["default"])();
  card.controlBar = Object(_get_control_bar_template__WEBPACK_IMPORTED_MODULE_1__["default"])();
  card.textarea = Object(_get_textarea_template__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
  card.settings = Object(_get_card_settings_template__WEBPACK_IMPORTED_MODULE_3__["default"])(data);
  card.statusBtns = Object(_get_status_btns_template__WEBPACK_IMPORTED_MODULE_4__["default"])();
  article.innerHTML = `
    <form class="card__form" method="get">
      <div class="card__inner">
        ${card.control}
        ${card.controlBar}
        ${card.textarea}
        ${card.settings}
        ${card.statusBtns}
      </div>
    </form>
  `;
  tasksContainer.appendChild(article);
  return article;
};

const changeTasks = tasks => {
  clearElement(tasksContainer);
  tasks.forEach(task => task.render());
};

const clearElement = el => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};



/***/ }),

/***/ "./src/components/filter/get-input-template.js":
/*!*****************************************************!*\
  !*** ./src/components/filter/get-input-template.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getInputTemplate = (id, checked, disabled) => {
  return `
  <input
    type="radio"
    id="${id}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked ? `checked` : ``}
    ${disabled ? `disabled` : ``}
  />`;
};

/* harmony default export */ __webpack_exports__["default"] = (getInputTemplate);

/***/ }),

/***/ "./src/components/filter/get-label-template.js":
/*!*****************************************************!*\
  !*** ./src/components/filter/get-label-template.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getLabelTemplate = (id, name, count) => {
  return `
  <label for="${id}" class="filter__label">
    ${name} <span class="${id}-count">${count}</span></label
  >`;
};

/* harmony default export */ __webpack_exports__["default"] = (getLabelTemplate);

/***/ }),

/***/ "./src/components/filter/index.js":
/*!****************************************!*\
  !*** ./src/components/filter/index.js ***!
  \****************************************/
/*! exports provided: renderFilter, clearFiltersSection, addFiltersListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFilter", function() { return renderFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFiltersSection", function() { return clearFiltersSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFiltersListener", function() { return addFiltersListener; });
/* harmony import */ var _get_input_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-input-template */ "./src/components/filter/get-input-template.js");
/* harmony import */ var _get_label_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-label-template */ "./src/components/filter/get-label-template.js");


const filterSection = document.querySelector(`.main__filter`);

const renderFilter = data => {
  const {
    id,
    name,
    count,
    checked = false,
    disabled = false
  } = data;
  const template = document.createElement(`template`);
  const input = Object(_get_input_template__WEBPACK_IMPORTED_MODULE_0__["default"])(id, checked, disabled);
  const label = Object(_get_label_template__WEBPACK_IMPORTED_MODULE_1__["default"])(id, name, count);
  template.innerHTML = input + label;
  filterSection.appendChild(template.content);
};

const clearFiltersSection = () => {
  filterSection.innerHTML = ``;
};

const addFiltersListener = callback => {
  document.querySelectorAll(`.filter__input`).forEach(filter => {
    filter.addEventListener(`change`, callback);
  });
};



/***/ }),

/***/ "./src/containers/index.js":
/*!*********************************!*\
  !*** ./src/containers/index.js ***!
  \*********************************/
/*! exports provided: tasksContainerName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tasksContainerName", function() { return tasksContainerName; });
const tasksContainerName = `.board__tasks`;


/***/ }),

/***/ "./src/filter-list.js":
/*!****************************!*\
  !*** ./src/filter-list.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const filtersList = [{
  id: `filter__all`,
  name: `ALL`,
  count: 15,
  checked: true
}, {
  id: `filter__overdue`,
  name: `OVERDUE`,
  count: 0,
  disabled: true
}, {
  id: `filter__today`,
  name: `TODAY`,
  count: 0,
  disabled: true
}, {
  id: `filter__favorites`,
  name: `FAVORITES`,
  count: 7
}, {
  id: `filter__repeating`,
  name: `Repeating`,
  count: 2
}, {
  id: `filter__tags`,
  name: `Tags`,
  count: 6
}, {
  id: `filter__archive`,
  name: `ARCHIVE`,
  count: 115
}];
/* harmony default export */ __webpack_exports__["default"] = (filtersList);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-list */ "./src/filter-list.js");
/* harmony import */ var _components_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/filter */ "./src/components/filter/index.js");
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/card */ "./src/components/card/index.js");
/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mock */ "./src/mock/index.js");




Object(_components_filter__WEBPACK_IMPORTED_MODULE_1__["clearFiltersSection"])();
_filter_list__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(filter => Object(_components_filter__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(filter));
Object(_components_filter__WEBPACK_IMPORTED_MODULE_1__["addFiltersListener"])(() => {
  const rand = Math.floor(Math.random() * 5) + 1;
  const tasks = Object(_mock__WEBPACK_IMPORTED_MODULE_3__["getTestTaskList"])(rand);
  Object(_components_card__WEBPACK_IMPORTED_MODULE_2__["changeTasks"])(tasks);
});
window.addEventListener(`load`, () => {
  const tasks = Object(_mock__WEBPACK_IMPORTED_MODULE_3__["getTestTaskList"])(7);
  Object(_components_card__WEBPACK_IMPORTED_MODULE_2__["changeTasks"])(tasks);
});

/***/ }),

/***/ "./src/mock/get-test-task.js":
/*!***********************************!*\
  !*** ./src/mock/get-test-task.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./src/common/index.js");
/* harmony import */ var _tag_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tag-list */ "./src/mock/tag-list.js");
/* harmony import */ var _title_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./title-list */ "./src/mock/title-list.js");




const getRandomIndex = length => {
  return Math.floor(Math.random() * length);
};

const getRandomDate = days => {
  return Date.now() + 1 + getRandomIndex(days) * 24 * 60 * 60 * 1000;
};

const getRandomSet = (length, array) => {
  const len = array.length;
  const temp = new Array(length).fill(1).map(() => array[getRandomIndex(len)]);
  return new Set(temp);
};

const getTestTask = () => {
  return {
    title: _title_list__WEBPACK_IMPORTED_MODULE_2__["default"][getRandomIndex(_title_list__WEBPACK_IMPORTED_MODULE_2__["default"].length)],
    dueDate: getRandomDate(7),
    tags: getRandomSet(3, _tag_list__WEBPACK_IMPORTED_MODULE_1__["default"]),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: _common__WEBPACK_IMPORTED_MODULE_0__["colorList"][getRandomIndex(_common__WEBPACK_IMPORTED_MODULE_0__["colorList"].length)],
    repeatingDays: {
      'mo': true,
      'tu': false,
      'we': true,
      'th': false,
      'fr': false,
      'sa': true,
      'su': false
    },
    isFavourite: false,
    isDone: false
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getTestTask);

/***/ }),

/***/ "./src/mock/index.js":
/*!***************************!*\
  !*** ./src/mock/index.js ***!
  \***************************/
/*! exports provided: getTestTask, getTestTaskList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTestTaskList", function() { return getTestTaskList; });
/* harmony import */ var _get_test_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-test-task */ "./src/mock/get-test-task.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTestTask", function() { return _get_test_task__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _class_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/task */ "./src/class/task.js");



const getTestTaskList = amount => {
  const array = new Array(amount).fill(1);
  return array.map((_el, index) => {
    const task = new _class_task__WEBPACK_IMPORTED_MODULE_1__["default"](Object(_get_test_task__WEBPACK_IMPORTED_MODULE_0__["default"])());
    task.index = index;
    return task;
  });
};



/***/ }),

/***/ "./src/mock/tag-list.js":
/*!******************************!*\
  !*** ./src/mock/tag-list.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const tagList = [`cinema`, `entertainment`, `myself`, `cinema`, `homework`, `theory`, `practice`, `intensive`, `keks`];
/* harmony default export */ __webpack_exports__["default"] = (tagList);

/***/ }),

/***/ "./src/mock/title-list.js":
/*!********************************!*\
  !*** ./src/mock/title-list.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const titleList = [`Prepare for the pitch`, `find money for travel`, `eat something`];
/* harmony default export */ __webpack_exports__["default"] = (titleList);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map