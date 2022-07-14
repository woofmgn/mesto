import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";

const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'form__input-error_active'
};

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = formElementProfile.querySelector('.popup__form-item_type_name');
const jobInput = formElementProfile.querySelector('.popup__form-item_type_job');
const popupAddCards = document.querySelector('.popup_type_cards');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');
const cardListElement = document.querySelector('.element');
const formElementNewPlace = popupAddCards.querySelector('.popup__form_type_cards');
const inputPlaceNameNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_place');
const inputLinkNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_link');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageFull = document.querySelector('.popup__image-item');
export const popupImageTitle = document.querySelector('.popup__title-image');

const profileValidator = new FormValidator(classListObject, formElementProfile);
const newPlaceValidator = new FormValidator(classListObject, formElementNewPlace);

const popupOpenProfile = new Popup(popupProfile);
const popupOpenAddCard = new Popup(popupAddCards);

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item, '.card-template');
      const cardItem = card.generateCard();
      defaultCardList.addItem(cardItem);
    }
}, cardListElement);

function handlerEditProfileFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  popupOpenProfile.close();
  profileValidator.disabledButtonSubmit();
};

function createCard(cardElement) {
  const card = new Card(cardElement, '.card-template');
  const cardItem = card.generateCard();
  return cardItem;
}

// рендер новой карточки пользователя
function renderUserCard(cardElement) {
  const userCard = createCard(cardElement);
  cardListElement.prepend(userCard);
}

// добавление новой карточки пользователем
const handleAddCardsSubmit = evt => {
  evt.preventDefault();

  const itemInput = {
    name: inputPlaceNameNewPlace.value,
    link: inputLinkNewPlace.value
  };

  renderUserCard(itemInput);
  popupOpenAddCard.close();
  formElementNewPlace.reset();
  newPlaceValidator.disabledButtonSubmit();
};

// слушаем открытие/закрытие попапов
buttonOpenPopupProfile.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  popupOpenProfile.open();
  profileValidator.resetError();
});

formElementProfile.addEventListener('submit', handlerEditProfileFormSubmit);

buttonOpenPopupAddCards.addEventListener('click', () => {
  popupOpenAddCard.open();
});

popupOpenProfile.setEventListeners();
popupOpenAddCard.setEventListeners();

formElementNewPlace.addEventListener('submit', handleAddCardsSubmit);

defaultCardList.renderItems();

profileValidator.enableValidation();
newPlaceValidator.enableValidation();
