import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formContainer = this._popupSelector.querySelector('.popup__input-container');
    this._formInputs = this._formContainer.querySelectorAll('.popup__form-item');
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    const valuesList = {};
    this._formInputs.forEach(item => {
      return valuesList[item.name] = item.value;
    });
    return valuesList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formContainer.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
