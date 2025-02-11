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

// @todo: Вывести карточки на страницу

function conclusionСard(cardList) {
  cardList.forEach((card) => {
    container.append(
      createCard(card, handleDeleteCard, handleLikeCard, handleImageClick)
    );
  });
}

// открытие popup с картинкой

function handleImageClick(evt) {
  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popup);
}

// открытия профиля

const popupEditButton = document.querySelector(".profile__edit-button");

function handleEditButton(evt) {
  const popup = document.querySelector(".popup_type_edit");

  openModal(popup);
}

popupEditButton.addEventListener("click", handleEditButton);

// открытия добавления карточки на +

const popupAddButton = document.querySelector(".profile__add-button");

function handleAddButton(evt) {
  const popup = document.querySelector(".popup_type_new-card");

  openModal(popup);
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
  const popupToClose = document.querySelector(".popup_is-opened");

  if (evt.key === "Escape") {
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

conclusionСard(initialCards);
