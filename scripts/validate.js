const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.popup__form-item');
const formError = formElement.querySelector(`.${formInput.id}-error`);

// функция добавления класса с ошибкой ввода
const showInputError = (input, errorMessage) => {
  input.classList.add('popup__form-item_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active')
};

// функция удаления класса с ошибкой
const hideInputError = (input) => {
  input.classList.remove('popup__form-item_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

// проверяем валидность инпута и выводим/скрываем ошибку
const checkInputValidity = () => {
  if(!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  }else{
    hideInputError(formInput);
  }
};

// отменяем стандартную отправку сабмитов
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

// слушаем каждый введенный в форму символ на наличие ошибки
formInput.addEventListener('input',function () {
  checkInputValidity();
});
