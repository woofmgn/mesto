const openPopupProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const closePopupProfile = document.querySelector('.popup__close-window');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = formElementProfile.querySelector('.popup__form-item_type_name');
const jobInput = formElementProfile.querySelector('.popup__form-item_type_job');
const saveUserInput = formElementProfile.querySelector('.popup__form-button');
const popupAddCards = document.querySelector('.popup_type_cards');
const openPopupAddCards = document.querySelector('.profile__add-button');
const closePopupAddCards = popupAddCards.querySelector('.popup__close-window');
const cardListElement = document.querySelector('.element');
const cardTemplateElement = document.querySelector('.card-template');
const formElementNewPlace = popupAddCards.querySelector('.popup__form_type_cards');
const inputPlaceNameNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_place');
const inputLinkNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_link');
const popupImage = document.querySelector('.popup_type_image');
const popupImageFull = document.querySelector('.popup__image-item');
const popupImageTitle = document.querySelector('.popup__title-image');
const popupImageClose = document.querySelector('.popup__close-window_type_image');
const buttonReset = formElementNewPlace.querySelector('.popup__form-button');

// создаем карточку, прослушиваем лайки/анлайки, прослушиваем удаление карточек,
// прослушиваем и открывает попап картинки
const createCard = item => {
  const card = cardTemplateElement.content.querySelector('.element__item').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  card.querySelector('.element__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active');
  });

  card.querySelector('.element__trash-button').addEventListener('click', evt => {
    evt.target.closest('.element__item').remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    imageFullScreen(item);
  });

  return card;
};

function imageFullScreen(item) {
  popupImageFull.src = item.link;
  popupImageTitle.textContent = item.name;
};

// добавляем карточку
const addCard = item => {
  const card = createCard(item);

  cardListElement.append(card);
};

function openPopup(item) {
  item.classList.add('popup_opened');
    if (item === popupProfile) {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  };
  document.addEventListener('keydown', pressEscPopupListener);
};

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscPopupListener);
};

function handlerEditProfileFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

//добавление новой карточки через кнопку
const handleAddCardsSubmit = evt => {
  evt.preventDefault();

  const itemInput = {
    name: inputPlaceNameNewPlace.value,
    link: inputLinkNewPlace.value
  };

  const inputValue = createCard(itemInput);
  cardListElement.prepend(inputValue);

  closePopup(popupAddCards);
  formElementNewPlace.reset();
  disabledButtonSubmit(buttonElement, buttonReset);
};

// перебираем массив при добавлении карточки
initialCards.forEach(addCard);

// убираем ошибки валидации, если пользователь ввел не верные данные и закрыл попап
function resetErrorClosePopup() {
  const formInput = Array.from(document.querySelectorAll(classListObject.inputSelector));
  const inputErrorMessage = Array.from(document.querySelectorAll('.popup__input-error'));

  formInput.forEach(item => {
    item.classList.remove(classListObject.inputErrorClass);
  });

  inputErrorMessage.forEach(item => {
    item.classList.remove(classListObject.errorClass);
  });
}

// function resetErrorClosePopup() {
//   const formElement = document.querySelector(classListObject.formSelector);
//   const inputElement = formElement.querySelector(cardListElement.inputElement);
//   hideInputError(formElement, inputElement);
// }

const pressEscPopupListener = (evt) => {
    if(evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened')
      closePopup(activePopup);
      resetErrorClosePopup();
    }
};

// слушаем открытие/закрытие попапов
openPopupProfile.addEventListener('click', () => {
  openPopup(popupProfile);
});

closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
  resetErrorClosePopup();
});

formElementProfile.addEventListener('submit', handlerEditProfileFormSubmit);

openPopupAddCards.addEventListener('click', () => {
  openPopup(popupAddCards);
});

closePopupAddCards.addEventListener('click', () => {
  closePopup(popupAddCards);
});

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});

popupProfile.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupProfile);
    resetErrorClosePopup();
  }
});

popupAddCards.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupAddCards);
    resetErrorClosePopup();
  }
});

popupImage.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupImage);
  }
});

formElementNewPlace.addEventListener('submit', handleAddCardsSubmit);

