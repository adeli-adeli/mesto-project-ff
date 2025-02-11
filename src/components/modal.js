// Находим форму в DOM

import { handleCloseButton, handleEscButton, handleOverlayClick } from "..";

const formElement = document.forms["edit-profile"]; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.elements.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.elements.description; // Воспользуйтесь инструментом .querySelector()

const addElement = document.forms["new-place"];
const placeNameInput = addElement.elements["place-name"];
const linkInput = addElement.elements.link;


// функция редоктирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const name = nameInput.value;
  const job = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  evt.target.reset();

  const popupToClose = evt.target.closest(".popup");
  closeModal(popupToClose);
}


formElement.addEventListener("submit", handleFormSubmit);

// функция добавления новой карты

function addNewCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const link = linkInput.value;

  const cardImage = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__title");

  cardTitle.textContent = placeName;
  cardImage.src = link;

  evt.target.reset();

  const popupToClose = evt.target.closest(".popup");
  closeModal(popupToClose);
}

addElement.addEventListener("submit", addNewCard);


// функция открытия popup

export function openModal(modalObj) {
  const modalCloseButton = modalObj.querySelector(".popup__close");

  modalObj.classList.add("popup_is-opened");
  modalObj.classList.add("popup_is-animated");

  modalCloseButton.addEventListener("click", handleCloseButton);
  document.addEventListener("keydown", handleEscButton);
  modalObj.addEventListener("click", handleOverlayClick);
}

// функция закрытия popup 

export function closeModal(modalObj) {
  modalObj.classList.remove("popup_is-opened");
  modalObj.classList.remove("popup_is-animated");
}
