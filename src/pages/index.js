import '../pages/index.css'

import {
  classListObject,
  buttonOpenPopupProfile,
  formElementProfile,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  formElementUserAvatar,
  buttonOpenPopupNewAvatar,
  settingsApi
  } from '../utils/constants.js';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import PopupWithDelCard from '../components/PopupWithDelCard.js';

const profileValidator = new FormValidator(classListObject, formElementProfile);
const newPlaceValidator = new FormValidator(classListObject, formElementNewPlace);
const userProfileAvatar = new FormValidator(classListObject, formElementUserAvatar);

const popupOpenImage = new PopupWithImage('.popup_type_image');

const newPlaceForm = new PopupWithForm('.popup_type_cards', handleAddCardsSubmit);
const popupUserProfile = new PopupWithForm('.popup_type_profile', handleEditProfileFormSubmit);
const popupUserAvatar = new PopupWithForm('.popup_type_avatar', handleNewAvatarSubmit)

const popupDeleteCard = new PopupWithDelCard('.popup_type_delete', handleDeleteCard);

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
        const inverseArr = cards.reverse().map(item => {
          return item;
        })
        defaultCardList.renderItems(inverseArr);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

const defaultCardList = new Section({
  renderer: (item) => {
      const card = createCard(item)
      defaultCardList.addItem(card);
    }
}, cardListElement);

function createCard(cardElement) {
  const card = new Card(
    cardElement,
    '.card-template',
     handleCardClick,
     handlePopupDelCard,
     userId,
     () => {
       api.addLikeCard(cardElement._id)
        .then(cardElement => {
          card.checkCountLikes(cardElement);
          card.addLikeCard();
         })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
     },
     () => {
        api.delLikeCard(cardElement._id)
          .then(cardElement => {
          card.checkCountLikes(cardElement);
          card.delLikeCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
     }
     );
  const cardItem = card.generateCard();
  return cardItem;
}

function handleEditProfileFormSubmit(item) {
  popupUserProfile.renderLoading(true);
  api.setUserProfile(item)
    .then(item => {
      userInfo.setUserInfo(item)
  popupUserProfile.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(res => {
      popupUserProfile.renderLoading(false);
    })
};

function handleAddCardsSubmit(cardElement) {
  newPlaceForm.renderLoading(true);
  api.addNewCard(cardElement.name, cardElement.link)
    .then(cardElement => {
  const userCard = createCard(cardElement);
  defaultCardList.addItem(userCard);
  newPlaceForm.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(res => {
      newPlaceForm.renderLoading(false);
    })
};

function handleNewAvatarSubmit(item) {
  popupUserAvatar.renderLoading(true);
  api.setUserAvatar(item)
    .then(item => {
      userInfo.setUserInfo(item);
      popupUserAvatar.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(res => {
      popupUserAvatar.renderLoading(false);
    })
}

function handlePopupDelCard(data) {
  popupDeleteCard.open();
  popupDeleteCard.ownerCard(data);
}

function handleDeleteCard(cardElement) {
  api.delCard(cardElement._cardId)
    .then(() => {
      popupDeleteCard.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
  cardElement.handleDeleteCard();
}

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

buttonOpenPopupNewAvatar.addEventListener('click', () => {
  userProfileAvatar.resetError();
  userProfileAvatar.disabledButtonSubmit;
  popupUserAvatar.open();
})

newPlaceForm.setEventListeners();
popupUserProfile.setEventListeners();
popupOpenImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupUserAvatar.setEventListeners();

profileValidator.enableValidation();
newPlaceValidator.enableValidation();
userProfileAvatar.enableValidation();
