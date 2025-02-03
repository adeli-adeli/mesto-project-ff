import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard, handleDeleteCard, handleLikeCard, handleImageClick} from "./components/card";

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");



// @todo: Вывести карточки на страницу

function conclusionСard(cardList) {
  
  cardList.forEach((card) => {
    container.append(createCard(card, handleDeleteCard, handleLikeCard, handleImageClick));
  });
}



conclusionСard(initialCards);
