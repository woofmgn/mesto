import '../src/pages/index.css';

import {
  classListObject,
  buttonOpenPopupProfile,
  popupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  popupAddCards,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  popupImage } from '../src/utils/constants.js';

import { initialCards } from "../src/utils/initial-cards.js";
import { Card } from "../src/components/Card.js"
import { FormValidator } from "../src/components/FormValidator.js";
import Section from "../src/components/Section.js";
import Popup from "../src/components/Popup.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js"

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
