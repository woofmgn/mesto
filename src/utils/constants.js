const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'form__input-error_active',
  userNameClass: '.profile__title',
  userJobClass: '.profile__subtitle'
};

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__form-item_type_name');
const jobInput = document.querySelector('.popup__form-item_type_job');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');
const cardListElement = document.querySelector('.element');
const formElementNewPlace = document.querySelector('.popup__form_type_cards');


export {
  classListObject,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  }
