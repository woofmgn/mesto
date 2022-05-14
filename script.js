let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-window');
let formElement = document.querySelector('.popup__input-container');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let nameInputValue = nameInput.querySelector('value');
let jobInput = formElement.querySelector('.popup__form-item_type_job');
let saveUserInput = formElement.querySelector('.popup__form-button');
let jobInputValue = jobInput.querySelector('value');

function open() {
  popup.classList.add('popup_opened');
}

function close() {
  closePopup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', open);
closePopup.addEventListener('click', close);

function formSubmitHandler (evt) {
  evt.preventDefault();
}

function saveInput() {
  nameInputValue.getAttribute('value');
  jobInputValue.getAttribute('value');
  userName.textContent('nameInputValue');
  userJob.textContent('jobInputValue');
  closePopup.classList.remove('popup_opened');
}


saveUserInput.addEventListener('click', saveInput);
