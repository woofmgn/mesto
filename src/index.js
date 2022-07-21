import '../src/pages/index.css';


import { initialCards } from "../src/scripts/initial-cards.js";
import { Card } from "../src/components/Card.js"
import { FormValidator } from "../src/components/FormValidator.js";
import Section from "../src/components/Section.js";
import Popup from "../src/components/Popup.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js"

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
const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__form-item_type_name');
const jobInput = formElementProfile.querySelector('.popup__form-item_type_job');
const popupAddCards = document.querySelector('.popup_type_cards');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');
const cardListElement = document.querySelector('.element');
const formElementNewPlace = popupAddCards.querySelector('.popup__form_type_cards');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageFull = document.querySelector('.popup__image-item');
export const popupImageTitle = document.querySelector('.popup__title-image');

const profileValidator = new FormValidator(classListObject, formElementProfile);
const newPlaceValidator = new FormValidator(classListObject, formElementNewPlace);
const popupOpenProfile = new Popup(popupProfile);
const popupOpenImage = new PopupWithImage(popupImage);
const userInfo = new UserInfo(classListObject);

function handleCardClick(link, title) {
  popupOpenImage.open(link, title);
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick);
      const cardItem = card.generateCard();
      defaultCardList.addItem(cardItem);
    }
}, cardListElement);

function handlerEditProfileFormSubmit (item) {
  userInfo.setUserInfo(item);
  popupOpenProfile.close();
  profileValidator.disabledButtonSubmit();
};

function createCard(cardElement) {
  const card = new Card(cardElement, '.card-template', handleCardClick);
  const cardItem = card.generateCard();
  return cardItem;
}

const handleAddCardsSubmit = cardElement => {
  const userCard = createCard(cardElement);
  defaultCardList.addItem(userCard);
  newPlaceForm.close();
  newPlaceValidator.disabledButtonSubmit();
};

const newPlaceForm = new PopupWithForm(popupAddCards, handleAddCardsSubmit);
newPlaceForm.setEventListeners();

const popupUserProfile = new PopupWithForm(popupProfile, handlerEditProfileFormSubmit);
popupUserProfile.setEventListeners();

function importDefaultInputs(item) {
  nameInput.value = item.formName;
  jobInput.value = item.formJob;
}

buttonOpenPopupProfile.addEventListener('click', () => {
  const inputList = userInfo.getUserInfo();

  importDefaultInputs(inputList);
  popupOpenProfile.open();
  profileValidator.resetError();
});

buttonOpenPopupAddCards.addEventListener('click', () => {
  newPlaceValidator.resetError();
  newPlaceForm.open();
});

defaultCardList.renderItems();

popupOpenProfile.setEventListeners();
popupOpenImage.setEventListeners();

profileValidator.enableValidation();
newPlaceValidator.enableValidation();
