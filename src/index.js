import "./pages/index.css";
import { createCard, handleLikeCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  postNewCard,
  patchEditProfile,
  patchEditProfileAvatar,
  deleteCardInfo,
} from "./components/api.js";

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");

export const allPopups = document.querySelectorAll(".popup");

const modalCloseButtonCollection = document.querySelectorAll(".popup__close");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const popupEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const popupImageButton = document.querySelector(".profile__image-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const addElement = document.forms["new-place"];
const placeNameInput = addElement.elements["place-name"];
const linkInput = addElement.elements.link;

const newAvatar = document.forms["new-avatar"];
const avatarInput = newAvatar.elements.link;

const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
const deletionConfirmation = document.querySelector(".deletion_confirmation");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// @todo: Вывести карточки на страницу

Promise.all([getUserInfo(), getInitialCards()]).then(([user, card]) => {
  card.forEach((cards) => {
    container.append(
      createCard(
        cards,
        handleCardDeleteButton,
        handleLikeCard,
        handleImageClick,
        user._id
      )
    );
  });

  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.setAttribute(`style`, `background-image: url(${user.avatar})`);
});

// открытие popup с картинкой

function handleImageClick(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
}

// открытия профиля

function handleEditButton(evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
}

popupEditButton.addEventListener("click", handleEditButton);

// открытия добавления карточки на +

function handleAddButton(evt) {
  openModal(popupTypeNewCard);
}

popupAddButton.addEventListener("click", handleAddButton);

// открытия редоктирования аватара

function handleEditAvatar(evt) {
  openModal(popupTypeNewAvatar);
}

popupImageButton.addEventListener("click", handleEditAvatar);

// закрытие popup на клик

export function handleCloseButton(evt) {
  const popupToClose = document.querySelector(".popup_is-opened");

  closeModal(popupToClose);
}

// функция редоктирования профиля

function handleFormProfileEditing(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();

  const popupToClose = document.querySelector(".popup_is-opened");

  const editProfile = {
    name: nameInput.value,
    about: jobInput.value,
  };

  patchEditProfile(editProfile)
    .then((edit) => {
      profileTitle.textContent = edit.name;
      profileDescription.textContent = edit.about;
      evt.target.reset();
      clearValidation(formElement, validationConfig);
      closeModal(popupToClose);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

formElement.addEventListener("submit", handleFormProfileEditing);

function handleFormProfileEditingAvatar(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";

  const popupToClose = document.querySelector(".popup_is-opened");

  evt.preventDefault();

  const avatarValue = {
    avatar: avatarInput.value,
  };

  patchEditProfileAvatar(avatarValue)
    .then((data) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${data.avatar})`
      );
      evt.target.reset();
      clearValidation(newAvatar, validationConfig);
      closeModal(popupToClose);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

newAvatar.addEventListener("submit", handleFormProfileEditingAvatar);

// функция добавления новой карты

function addNewCard(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";

  evt.preventDefault();
  const popupToClose = document.querySelector(".popup_is-opened");

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  postNewCard(newCard)
    .then((card) => {
      container.prepend(
        createCard(
          card,
          handleCardDeleteButton,
          handleLikeCard,
          handleImageClick,
          card.owner._id
        )
      );
      evt.target.reset();
      clearValidation(addElement, validationConfig);
      closeModal(popupToClose);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

addElement.addEventListener("submit", addNewCard);

let cardToDelete = null;
let cardIdToDelete = null;

function handleCardDeleteButton(card, cardId) {
  cardToDelete = card;
  cardIdToDelete = cardId;

  openModal(popupTypeDeleteCard);
}

//подверждение удаления карточки
function handleCardDeleteSubmit() {
  const popupToClose = document.querySelector(".popup_is-opened");

  deleteCardInfo(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupToClose);
    })
    .catch((err) => {
      console.log(err);
    });
}

deletionConfirmation.addEventListener("click", handleCardDeleteSubmit);

// находим колекцию циклом, и вешаем слушатель на каждую

modalCloseButtonCollection.forEach((closeButton) => {
  closeButton.addEventListener("click", handleCloseButton);
});

enableValidation(validationConfig);
