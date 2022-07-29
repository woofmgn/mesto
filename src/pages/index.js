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

Promise.all([api.getInitialCards(), api.getUserProfile()])
    .then(([cards, userProfile]) => {
        userInfo.setUserInfo(userProfile);
        userId = userProfile._id;
        defaultCardList.renderItems(cards);
        console.log(userProfile);
        console.log(userId);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

// api.getInitialCards()
//   .then(render => {
//     defaultCardList.renderItems(render)
//   })
//   .catch(err => console.log(err));

// api.getUserProfile()
//   .then(render => {
//     userInfo.setUserInfo(render);
//     userId = render._id;
//   })
//   .catch(err => console.log(err));

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

// function handleEditProfileFormSubmit(item) {
//   userInfo.setUserInfo(item);
//   popupUserProfile.close();
// };

function handleEditProfileFormSubmit(item) {
  api.setUserProfile(item)
    .then(item => {
      userInfo.setUserInfo(item)
      popupUserProfile.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
};

// function handleAddCardsSubmit(cardElement) {
//   const userCard = createCard(cardElement);
//   defaultCardList.addItem(userCard);
//   newPlaceForm.close();
// };

function handleAddCardsSubmit(cardElement) {
  api.addNewCard(cardElement.name, cardElement.link)
    .then(cardElement => {
      const userCard = createCard(cardElement);
      defaultCardList.addItem(userCard);
      newPlaceForm.close();
    })
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
