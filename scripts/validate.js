const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'form__input-error_active'
};

const buttonElement = document.querySelector('.popup__form-button');

// функция добавления класса с ошибкой ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__form-item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active')
  buttonElement.setAttribute('disabled', 'disabled');
  buttonElement.classList.add('popup__form-button_inactive');
};

// функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__form-item_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
  buttonElement.removeAttribute('disabled', 'disabled');
  buttonElement.classList.remove('popup__form-button_inactive');
};

// проверяем валидность инпута и выводим/скрываем ошибку
const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  }
};

function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-item'));
  const buttonElement = formElement.querySelector('.popup__form-button');

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListener(formElement);
  });
}

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    // buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add('popup__form-button_inactive');
  }else{
    // buttonElement.removeAttribute('disabled', 'disabled');
    buttonElement.classList.remove('popup__form-button_inactive');
  }
}
