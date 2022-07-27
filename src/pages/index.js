import '../pages/index.css'

import {
  classListObject,
  buttonOpenPopupProfile,
  formElementProfile,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  settingsApi
  } from '../utils/constants.js';

import { initialCards } from "../utils/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"

const profileValidator = new FormValidator(classListObject, formElementProfile);
const newPlaceValidator = new FormValidator(classListObject, formElementNewPlace);

const popupOpenImage = new PopupWithImage('.popup_type_image');
const newPlaceForm = new PopupWithForm('.popup_type_cards', handleAddCardsSubmit);
const popupUserProfile = new PopupWithForm('.popup_type_profile', handleEditProfileFormSubmit);

const userInfo = new UserInfo(classListObject);

function handleCardClick(link, title) {
  popupOpenImage.open(link, title);
}


const api = new Api(settingsApi);

let userId;

api.getInitialCards()
  .then(render => {
    defaultCardList.renderItems(render)
  })
  .catch(err => console.log(err))

api.getUserProfile()
  .then(render => {
    console.log(render);
  })
  .catch(err => console.log(err))

const defaultCardList = new Section({
  // items: initialCards,
  renderer: (item) => {
      const card = createCard(item)
      defaultCardList.addItem(card);
    }
}, cardListElement);

function createCard(cardElement) {
  const card = new Card(cardElement, '.card-template', handleCardClick);
  const cardItem = card.generateCard();
  return cardItem;
}

function handleEditProfileFormSubmit(item) {
  userInfo.setUserInfo(item);
  popupUserProfile.close();
};

function handleAddCardsSubmit(cardElement) {
  const userCard = createCard(cardElement);
  defaultCardList.addItem(userCard);
  newPlaceForm.close();
};

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

// defaultCardList.renderItems();

newPlaceForm.setEventListeners();
popupUserProfile.setEventListeners();
popupOpenImage.setEventListeners();

profileValidator.enableValidation();
newPlaceValidator.enableValidation();



// const api = new Api(settingsApi);
// console.log(api.getInitialCards());
