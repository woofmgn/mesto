export class Card {
  constructor(data, cardSelector, handlerOpenImgPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlerOpenImgPopup = handlerOpenImgPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._addListeners();
    return this._element;
  }

  _addListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handlerLikeCard();
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handlerDeleteCard();
    });
    this._elementImage.addEventListener('click', () => {
      this._handlerOpenImgPopup(this._link, this._name);
    });
  }

  _handlerLikeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handlerDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
