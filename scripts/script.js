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

const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-window');
const formElement = document.querySelector('.popup__container');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const saveUserInput = formElement.querySelector('.popup__form-button');

const cardListElement = document.querySelector('.element');
const cardTemplateElement = document.querySelector('.card-template');

// создаем карточку
const createCard = item => {
  const card = cardTemplateElement.content.querySelector('.element__item').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  return card;
};

// добавляем карточку
const addCard = item => {
  const card = createCard(item);

  cardListElement.append(card);
};

// перебираем массив при добавлении карточки
initialCards.forEach(addCard);




function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  popupClose();
}

openPopup.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
