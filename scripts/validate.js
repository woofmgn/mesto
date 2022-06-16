const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'form__input-error_active'
};

const buttonElement = document.querySelector(classListObject.submitButtonSelector);

function disabledButtonSubmit(buttonElement, buttonReset) {
  buttonElement.setAttribute('disabled', 'disabled');
  buttonReset.classList.add(classListObject.inactiveButtonClass);
};

function enabledButtonSubmit(buttonElement, buttonReset) {
  buttonElement.removeAttribute('disabled', 'disabled');
  buttonReset.classList.remove(classListObject.inactiveButtonClass);
};

// функция добавления класса с ошибкой ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(classListObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classListObject.errorClass)
  // buttonElement.setAttribute('disabled', 'disabled');
  // buttonElement.classList.add(classListObject.inactiveButtonClass);
  disabledButtonSubmit(buttonElement, buttonReset);
};

// функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(classListObject.inputErrorClass);
  errorElement.classList.remove(classListObject.errorClass);
  errorElement.textContent = '';
  // buttonElement.removeAttribute('disabled', 'disabled');
  // buttonElement.classList.remove(classListObject.inactiveButtonClass);
  enabledButtonSubmit(buttonElement, buttonReset)
};

// проверяем валидность инпута и выводим/скрываем ошибку
const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  }
};

// слушаем все инпуты на правильность ввода
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(classListObject.inputSelector));
  const buttonElement = formElement.querySelector(classListObject.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
}

function enableValidation(classListObject) {
  const formList = Array.from(document.querySelectorAll(classListObject.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListener(formElement);
  });
}

enableValidation(classListObject);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// меняем статус кнопки в зависимости от состояния валидации
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    disabledButtonSubmit(buttonElement, buttonReset);
  }else{
    enabledButtonSubmit(buttonElement, buttonReset);
  }
}

