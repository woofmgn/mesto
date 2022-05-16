let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-window');
let formElement = document.querySelector('.popup__container');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');
let saveUserInput = formElement.querySelector('.popup__form-button');

function open() {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('value', userName.textContent);
  jobInput.setAttribute('value', userJob.textContent);
}

function close() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  userName.textContent = nameInputValue;
  userJob.textContent = jobInputValue;
  close();
}

openPopup.addEventListener('click', open);
closePopup.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);
