const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'form__input-error_active',
  userNameClass: '.profile__title',
  userJobClass: '.profile__subtitle',
  avatar: '.profile__image'
};

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');
const cardListElement = document.querySelector('.element');
const formElementNewPlace = document.querySelector('.popup__form_type_cards');

const settingsApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers:
      {
      authorization: 'e4f550f7-85d7-46b0-9c73-72a0998caf95',
      'Content-Type': 'application/json'
      }

};


export {
  classListObject,
  buttonOpenPopupProfile,
  formElementProfile,
  buttonOpenPopupAddCards,
  cardListElement,
  formElementNewPlace,
  settingsApi
  }

//   return fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'e4f550f7-85d7-46b0-9c73-72a0998caf95',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Curie',
//     about: 'Physicist and Chemist'
//   })
// })
//   .then(res => {
//     if(res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка Api: ${res.status}`);
//   });
