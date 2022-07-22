import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector('.popup__image-item');
    this._imageTitle = this._popup.querySelector('.popup__title-image');
  }

  open(link, title) {
    super.open();

    this._imageFull.src = link;
    this._imageFull.alt = title;
    this._imageTitle.textContent = title;
  }
}
