import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, title) {
    super.open();
    this._imageFull = this._popupSelector.querySelector('.popup__image-item');
    this._imageTitle = this._popupSelector.querySelector('.popup__title-image');

    this._imageFull.src = link;
    this._imageFull.alt = title;
    this._imageTitle.textContent = title;
  }


}