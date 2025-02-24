import "./pages/index.css";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCard,
  postNewCard,
  patchEditProfile,
} from "./components/api.js";

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");

export const popupAll = document.querySelectorAll(".popup");

const modalCloseButtonCollection = document.querySelectorAll(".popup__close");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const popupEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const addElement = document.forms["new-place"];
const placeNameInput = addElement.elements["place-name"];
const linkInput = addElement.elements.link;

const editAvatar = document.forms["edit-avatar"];
const avatarInput = formElement.elements.link;

// @todo: Вывести карточки на страницу

Promise.all([getUserInfo(), getInitialCard()]).then(([user, card]) => {
  card.forEach((card) => {
    container.append(
      createCard(
        card,
        handleDeleteCard,
        handleLikeCard,
        handleImageClick,
        user._id
      )
    );
  });


  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.src = user.avatar;

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

// закрытие popup на клик

export function handleCloseButton(evt) {
  const popupToClose = document.querySelector(".popup_is-opened");

  closeModal(popupToClose);
}

// функция редоктирования профиля

function handleFormProfileEditing(evt) {
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
      clearValidation(formElement);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      closeModal(popupToClose);
    });
}

formElement.addEventListener("submit", handleFormProfileEditing);

function handleFormProfileEditingAvatar() {
  // evt.preventDefault();

  // const popupToClose = document.querySelector(".popup_is-opened");

  // const editAvatar = {
  //   avatar: avatarInput.value,
  // };

  // patchEditProfileAvatar(editAvatar)
  //   .then((avatar) => {
  //     profileTitle.textContent = edit.name;
  //     profileDescription.textContent = edit.about;

  //     evt.target.reset();
  //     clearValidation(formElement);
  //   })
  //   .catch((err) => {
  //     console.log("Ошибка. Запрос не выполнен: ", err);
  //   })
  //   .finally(() => {
  //     closeModal(popupToClose);
  //   });
}

// функция добавления новой карты

function addNewCard(evt) {
  evt.preventDefault();
  const popupToClose = document.querySelector(".popup_is-opened");

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  postNewCard(newCard)
    .then((card) => {
      container.prepend(
        createCard(card, handleDeleteCard, handleLikeCard, handleImageClick)
      );

      evt.target.reset();
      clearValidation(addElement);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    })
    .finally(() => {
      closeModal(popupToClose);
    });
}

addElement.addEventListener("submit", addNewCard);

// находим колекцию циклом, и вешаем слушатель на каждую

modalCloseButtonCollection.forEach((closeButton) => {
  closeButton.addEventListener("click", handleCloseButton);
});

enableValidation();
