class FormValidator {
  constructor(classListObject, formSel) {
    this._formSelector = classListObject.formSelector;
    this._inputSelector = classListObject.inputSelector;
    this._submitButtonSelector = classListObject.submitButtonSelector;
    this._inactiveButtonClass = classListObject.inactiveButtonClass;
    this._inputErrorClass = classListObject.inputErrorClass;
    this._errorClass = classListObject.errorClass;
    this._formSel = formSel;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._disabledButtonSubmit();
    }else{
      this._enabledButtonSubmit();
    }
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }else{
      this._hideInputError(inputElement);
    }
  };

    // слушаем все инпуты на правильность ввода
  _setEventListener() {
    this._inputList = Array.from(this._formSel.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSel.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  _disabledButtonSubmit() {
    this._buttonElement.setAttribute('disabled', 'disabled');
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enabledButtonSubmit() {
    this._buttonElement.removeAttribute('disabled', 'disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  // функция добавления класса с ошибкой ввода
  _showInputError(inputElement) {
    this._error = this._formSel.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._error.textContent = inputElement.validationMessage;
    this._error.classList.add(this._errorClass)
  };

  _hideInputError(inputElement) {
    this._error = this._formSel.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  };

  // enableValidation() {
  //   const formList = Array.from(document.querySelectorAll(this._formSelector))

  //   formList.forEach((formElement) => {
  //     formElement.addEventListener('submit', function (evt) {
  //       evt.preventDefault();
  //     });
  //   setEventListener();
  //   });
  // }

  enableValidation() {
    this._setEventListener();
  }
}

