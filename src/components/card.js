// @todo: Функция создания карточки
import { cardTemplate } from "..";

export function createCard(element, deleteCard, likeCard, imageClick) {
  //   console.log(element);
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  imageCard.src = element.link;
  imageCard.alt = element.name;
  titleCard.textContent = element.name;

  deleteButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  imageCard.addEventListener("click", imageClick);

  return cardElement;
}

// @todo: Функция удаления карточки

export function handleDeleteCard(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

// Функция кнопки лайка

export function handleLikeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function handleImageClick(evt) {
  //получаем обьект popup

  const popup = document.querySelector(".popup_type_image");

  const popupImage = popup.querySelector(".popup__image");

  const popupCloseButton = popup.querySelector(".popup__close");

  const popupCaption = popup.querySelector(".popup__caption");

  //устанавливаем popup картинку дочернего элемента

  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  //делаем popup видимым

  popup.style.display = "flex";
  popup.classList.add("modal");

  //закрытие popup на крестик

  popupCloseButton.addEventListener("click", handelCloseButton);
  document.addEventListener("keydown", handelEscButton);
  popup.addEventListener("click", handelOverlayClick);
}

export function handelCloseButton(evt) {
  const popupToClose = evt.target.closest(".popup");

  popupToClose.style.display = "none";
  popupToClose.classList.remove("modal");

  popupToClose.removeEventListener("click", handelCloseButton);
  document.removeEventListener("keydown", handelEscButton);
  popupToClose.addEventListener("click", handelOverlayClick);
}

export function handelEscButton(evt) {
  const popupToClose = document.querySelector(".modal");

  if (evt.key === "Escape") {
    popupToClose.style.display = "none";
    popupToClose.classList.remove("modal");

    popupToClose.removeEventListener("click", handelCloseButton);
    document.removeEventListener("keydown", handelEscButton);
    popupToClose.addEventListener("click", handelOverlayClick);
  }
}

export function handelOverlayClick(evt) {
  const popupToClose = evt.target.closest(".popup");

  if (evt.target === evt.currentTarget) {
    popupToClose.style.display = "none";
    popupToClose.classList.remove("modal");

    popupToClose.removeEventListener("click", handelCloseButton);
    document.removeEventListener("keydown", handelEscButton);
    popupToClose.addEventListener("click", handelOverlayClick);
  }
}
