import Popup from '../components/Popup.js';

export default class PopupWithDelCard extends Popup {
  constructor(popupSelector, handleSubmitDelCard) {
    super(popupSelector)
    this._handleSubmitDelCard = handleSubmitDelCard;
    this._form = this._popup.querySelector('.popup__form')
  }

  ownerCard(card) {
    return this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitDelCard(this._card);
      this.close();
    })
  }
}
