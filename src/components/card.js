// @todo: Функция создания карточки
import { cardTemplate } from "..";


export function createCard(element, deleteCard, likeCard, imageClick) {
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




