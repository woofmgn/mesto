import { popupImage,  popupImageFull, popupImageTitle, openPopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
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
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handlerOpenImgPopup();
    });
  }

  _handlerLikeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handlerDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlerOpenImgPopup() {
    popupImageFull.src = this._link;
    popupImageFull.alt = this._name;
    popupImageTitle.textContent = this._name;
    openPopup(popupImage);
  }
}
