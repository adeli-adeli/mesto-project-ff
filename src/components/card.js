// @todo: Функция создания карточки
import { cardTemplate } from "..";
import { deleteCardInfo, deleteLikesCard, putLikesCard } from "./api.js";
import { closeModal, openModal } from "./modal.js";

export function createCard(element, deleteCard, likeCard, imageClick, userId) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const imageCard = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const likesCount = cardElement.querySelector(".card__like-count");

  const cardId = element._id;
  cardElement.id = `${cardId}`;

  imageCard.src = element.link;
  imageCard.alt = element.name;
  titleCard.textContent = element.name;

  const isLiked = element.likes.some((user) => {
    return user._id === userId;
  });

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  // проверка пользователя, если это твоя карточка то показываем кнопку удаления, если нет то скрываем
  if (element.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardId);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardId, likesCount);
  });
  imageCard.addEventListener("click", imageClick);

  likesCount.textContent = element.likes.length;

  return cardElement;
}

// @todo: Функция удаления карточки

export function handleDeleteCard(card, cardId) {
  const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
  const deletionConfirmation = document.querySelector(".deletion_confirmation");

  openModal(popupTypeDeleteCard);

  deletionConfirmation.addEventListener("click", () => {
    deleteCardInfo(cardId)
      .then(() => {
        card.remove();
        closeModal(popupTypeDeleteCard);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// Функция кнопки лайка

export function handleLikeCard(evt, cardId, likesCount) {
  //проверка если пользователь еще не поставил лайк - то ставим, если его лайк уже стоит удаляем

  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  if (!isLiked) {
    putLikesCard(cardId)
      .then((card) => {
        evt.target.classList.toggle("card__like-button_is-active");
        likesCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikesCard(cardId)
      .then((card) => {
        evt.target.classList.toggle("card__like-button_is-active");

        likesCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
