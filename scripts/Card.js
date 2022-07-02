// import { popupImage, openPopup } from "./script.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

class Card {
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
    this._element.querySelector('.element__trash-button').closest('.element__item').remove();
  }

  _handlerOpenImgPopup() {
    openPopup(popupImage);
    document.querySelector('.popup__image-item').src = this._link;
    document.querySelector('.popup__image-item').alt = this._name;
    document.querySelector('.popup__title-image').textContent = this._name;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  document.querySelector('.element').append(cardElement);
});
