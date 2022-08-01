export class Card {
  constructor(
    data,
    cardSelector,
    handleOpenImgPopup,
    handleDeleteCardPopup,
    idUser,
    handleAddLike,
    handleRemoveLike
    ) {
    this._data = data;
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
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element__item')
      .cloneNode(true);
    return cardElement;
  }

  _checkOwnerCard() {
    this._trashButton = this._element.querySelector('.element__trash-button');
    if (this._id == this._cardOwner) {
      this._trashButton.classList.add('element__trash-button_active');
    } else {
      this._trashButton.classList.remove('element__trash-button_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._checkOwnerCard();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeCounter.textContent = this._like.length;
    this._element.querySelector('.element__title').textContent = this._name;

    this._addListeners();
    this._checkOwnerLikes();

    return this._element;
  }

  _addListeners() {
    this._likeButton.addEventListener('click', () => {
      if(this._likeButton.classList.contains('element__like-button_active')) {
        this._handleRemoveLike();
      }else{
        this._handleAddLike();
      }
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleDeleteCardPopup(this);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleOpenImgPopup(this._link, this._name);
    });
  }

  addLikeCard() {
    this._likeButton.classList.add('element__like-button_active');
  }

  delLikeCard() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  checkCountLikes(item) {
    this._elementLikeCounter.textContent = item.likes.length;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkOwnerLikes() {
    this._like.forEach(cardItem => {
      if(cardItem._id == this._id){
        this.addLikeCard();
      }else{
        this.delLikeCard();
      }
    })
  }

}
