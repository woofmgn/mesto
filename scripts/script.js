const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopupProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const closePopupProfile = document.querySelector('.popup__close-window');
const formElementProfile = document.getElementsByName('user-info')[0];
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = formElementProfile.querySelector('.popup__form-item_type_name');
const jobInput = formElementProfile.querySelector('.popup__form-item_type_job');
const saveUserInput = formElementProfile.querySelector('.popup__form-button');
const popupAddCards = document.querySelector('.popup-cards');
const openPopupAddCards = document.querySelector('.profile__add-button');
const closePopupAddCards = popupAddCards.querySelector('.popup__close-window');
const cardListElement = document.querySelector('.element');
const cardTemplateElement = document.querySelector('.card-template');
const formElementNewPlace = document.getElementsByName('new-place')[0];
const inputPlaceNameNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_place');
const inputLinkNewPlace = formElementNewPlace.querySelector('.popup__form-item_type_link');
const popupImage = document.querySelector('.popup-image');
const popupImageFull = document.querySelector('.popup-image__item');
const popupImageTitle = document.querySelector('.popup-image__title');
const popupImageClose = document.querySelector('.popup-image__close-button');


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
};

function closePopup(item) {
  item.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
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
  popupAddCards.classList.remove('popup_opened');
  formElementNewPlace.reset();
};

// перебираем массив при добавлении карточки
initialCards.forEach(addCard);

// слушаем открытие/закрытие попапов
openPopupProfile.addEventListener('click', () => {
  openPopup(popupProfile);
});
closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
formElementProfile.addEventListener('submit', formSubmitHandler);

openPopupAddCards.addEventListener('click', () => {
  openPopup(popupAddCards);
});

closePopupAddCards.addEventListener('click', () => {
  closePopup(popupAddCards);
  formElementNewPlace.reset();
});

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});


formElementNewPlace.addEventListener('submit', handleAddCardsSubmit);

