export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', evt => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => {
      this._handleEscClose(evt)
    });
  }



  setEventListeners() {
    this._popupSelector.addEventListener('click', evt => {
      if(evt.target.classList.contains('popup__close-window')){
        this.close();
      }else if(evt.target.classList.contains('popup_opened'))
        this.close();
    });

  }

}
