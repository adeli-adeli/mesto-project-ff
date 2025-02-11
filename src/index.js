import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card";
import { closeModal, openModal } from "./components/modal";

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

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

const popupEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

function handleEditButton(evt) {
  openModal(popupTypeEdit);
}

popupEditButton.addEventListener("click", handleEditButton);

// открытия добавления карточки на +

const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

function handleAddButton(evt) {
  openModal(popupTypeNewCard);
}

popupAddButton.addEventListener("click", handleAddButton);

// закрытие popup на клик

export function handleCloseButton(evt) {
  const popupToClose = evt.target.closest(".popup");

  closeModal(popupToClose);

  popupToClose.removeEventListener("click", handleCloseButton);
  document.removeEventListener("keydown", handleAddButton);
  popupToClose.removeEventListener("click", handleOverlayClick);
}

// закрытие popup на кнопку

export function handleEscButton(evt) {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector(".popup_is-opened");

    closeModal(popupToClose);

    popupToClose.removeEventListener("click", handleCloseButton);
    document.removeEventListener("keydown", handleAddButton);
    popupToClose.removeEventListener("click", handleOverlayClick);
  }
}

// закрытие popup на оверлей

export function handleOverlayClick(evt) {
  const popupToClose = evt.target.closest(".popup");

  if (evt.target === evt.currentTarget) {
    closeModal(popupToClose);

    popupToClose.removeEventListener("click", handleCloseButton);
    document.removeEventListener("keydown", handleAddButton);
    popupToClose.removeEventListener("click", handleOverlayClick);
  }
}

conclusionCard(initialCards);
