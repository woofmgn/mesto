import '../pages/index.css'

import {
  classListObject,
  buttonOpenPopupProfile,
  formElementProfile,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  } from '../utils/constants.js';


import { initialCards } from "../utils/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileValidator = new FormValidator(classListObject, formElementProfile);
const newPlaceValidator = new FormValidator(classListObject, formElementNewPlace);
const popupOpenImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(classListObject);

function handleCardClick(link, title) {
  popupOpenImage.open(link, title);
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = createCard(item)
      defaultCardList.addItem(card);
    }
}, cardListElement);

function handleEditProfileFormSubmit (item) {
  userInfo.setUserInfo(item);
  popupUserProfile.close();
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
};


const newPlaceForm = new PopupWithForm('.popup_type_cards', handleAddCardsSubmit);

newPlaceForm.setEventListeners();
const popupUserProfile = new PopupWithForm('.popup_type_profile', handleEditProfileFormSubmit);

buttonOpenPopupProfile.addEventListener('click', () => {
  const inputList = userInfo.getUserInfo();

  popupUserProfile.setInputValues(inputList)
  profileValidator.resetError();
  profileValidator.disabledButtonSubmit();
  popupUserProfile.open();
});

buttonOpenPopupAddCards.addEventListener('click', () => {
  newPlaceValidator.resetError();
  newPlaceValidator.disabledButtonSubmit();
  newPlaceForm.open();
});

defaultCardList.renderItems();

popupUserProfile.setEventListeners();
popupOpenImage.setEventListeners();

profileValidator.enableValidation();
newPlaceValidator.enableValidation();
