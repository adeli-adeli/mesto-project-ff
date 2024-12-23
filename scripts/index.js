// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const container = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(element) {
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

    const imageCard = cardElement.querySelector('.card__image');
    const titleCard = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector(".card__delete-button");

    imageCard.src = element.link;
    imageCard.alt = element.name;
    titleCard.textContent = element.name;



    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });
    
    return cardElement;
  
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

function conclusionСard (cardList) {

cardList.forEach(card => {
  container.append(createCard(card))
});

}

conclusionСard(initialCards);