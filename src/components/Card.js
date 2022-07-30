export class Card {
  constructor(data, cardSelector, handleOpenImgPopup, handleDeleteCardPopup, idUser) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._id = idUser;
    // debugger;
    this._cardId = data._id;
    this._cardOwner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleOpenImgPopup = handleOpenImgPopup;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element__item')
      .cloneNode(true);
    return cardElement;
  }

  _checkOwner() {
    this._trashButton = this._element.querySelector('.element__trash-button');
    if (this._id == this._cardOwner) {
      this._trashButton.classList.add('element__trash-button_active');
    } else {
      this._trashButton.classList.remove('element__trash-button_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._checkOwner();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeCounter.textContent = this._like.length;
    this._element.querySelector('.element__title').textContent = this._name;

    this._addListeners();
    return this._element;
  }

  _addListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleDeleteCardPopup(this);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleOpenImgPopup(this._link, this._name);
    });
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
