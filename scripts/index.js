// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places");
const card = container.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard() {
  initialCards.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__title").textContent = element.name;

    card.append(cardElement);

    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });
  });
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

addCard();