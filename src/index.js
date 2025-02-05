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

function handleImageClick(evt) {
  //получаем обьект popup

  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  //устанавливаем popup картинку дочернего элемента

  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popup);
}

const popupEditButton = document.querySelector(".profile__edit-button");

function handleEditButton(evt) {
  const popup = document.querySelector(".popup_type_edit");

  openModal(popup);
}

popupEditButton.addEventListener("click", handleEditButton);

const popupAddButton = document.querySelector(".profile__add-button");

function handleAddButton(evt) {
  const popup = document.querySelector(".popup_type_new-card");

  openModal(popup);
}

popupAddButton.addEventListener("click", handleAddButton);

export function handelCloseButton(evt) {
  const popupToClose = evt.target.closest(".popup");

  closeModal(popupToClose);

  popupToClose.removeEventListener("click", handelCloseButton);
  document.removeEventListener("keydown", handelEscButton);
  popupToClose.removeEventListener("click", handelOverlayClick);
}

export function handelEscButton(evt) {
  const popupToClose = document.querySelector(".modal");

  if (evt.key === "Escape") {
    closeModal(popupToClose);

    popupToClose.removeEventListener("click", handelCloseButton);
    document.removeEventListener("keydown", handelEscButton);
    popupToClose.removeEventListener("click", handelOverlayClick);
  }
}

export function handelOverlayClick(evt) {
  const popupToClose = evt.target.closest(".popup");

  if (evt.target === evt.currentTarget) {
    closeModal(popupToClose);

    popupToClose.removeEventListener("click", handelCloseButton);
    document.removeEventListener("keydown", handelEscButton);
    popupToClose.removeEventListener("click", handelOverlayClick);
  }
}

conclusionСard(initialCards);
