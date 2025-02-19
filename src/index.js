import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card";
import { closeModal, openModal } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";

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

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const addElement = document.forms["new-place"];
const placeNameInput = addElement.elements["place-name"];
const linkInput = addElement.elements.link;

// @todo: Вывести карточки на страницу

function conclusionCard(cardList) {
  cardList.forEach((card) => {
    container.append(
      createCard(card, handleDeleteCard, handleLikeCard, handleImageClick)
    );
  });
}

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

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  evt.target.reset();

  closeModal(popupToClose);
}

formElement.addEventListener("submit", handleFormProfileEditing);

// функция добавления новой карты

function addNewCard(evt) {
  evt.preventDefault();
  const popupToClose = document.querySelector(".popup_is-opened");

  const cardNew = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  container.prepend(
    createCard(cardNew, handleDeleteCard, handleLikeCard, handleImageClick)
  );

  evt.target.reset();

  closeModal(popupToClose);
}

addElement.addEventListener("submit", addNewCard);

// находим колекцию циклом, и вешаем слушатель на каждую

modalCloseButtonCollection.forEach((closeButton) => {
  closeButton.addEventListener("click", handleCloseButton);
});

clearValidation(formElement)
clearValidation(addElement)

enableValidation();
conclusionCard(initialCards);
