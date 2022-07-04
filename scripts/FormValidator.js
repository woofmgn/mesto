class FormValidator {
  constructor(classListObject, formElement) {
    this._formSelector = classListObject.formSelector;
    this._inputSelector = classListObject.inputSelector;
    this._submitButtonSelector = classListObject.submitButtonSelector;
    this._inactiveButtonClass = classListObject.inactiveButtonClass;
    this._inputErrorClass = classListObject.inputErrorClass;
    this._errorClass = classListObject.errorClass;
    this._formElement = formElement;
  }

    // проверяем инпуты на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

    // меняем состояние сабмита, при наличии ошибки ввода в инпуте
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._disabledButtonSubmit();
    }else{
      this._enabledButtonSubmit();
    }
  }

    // вывод/скрытие сообщения об ошибке
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }else{
      this._hideInputError(inputElement);
    }
  };

    // слушаем все инпуты на правильность ввода
  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

    // сброс ошибок, метом передается в слушатель открытия попапа редактирования профиля
  resetError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
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
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._error.textContent = inputElement.validationMessage;
    this._error.classList.add(this._errorClass)
  };

  _hideInputError(inputElement) {
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  };

  enableValidation() {
    this._setEventListener();
  }
}

