// Находим форму в DOM

import { handelCloseButton, handelEscButton, handelOverlayClick } from "..";

const formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  const name = nameInput.value;
  const job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей

  const profileTitle = document.querySelector(".profile__title");

  const profileDescription = document.querySelector(".profile__description");

  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

export function openModal(modalObj) {
  const modalCloseButton = modalObj.querySelector(".popup__close");

  modalObj.style.display = "flex";
  modalObj.classList.add("modal");

  modalCloseButton.addEventListener("click", handelCloseButton);
  document.addEventListener("keydown", handelEscButton);
  modalObj.addEventListener("click", handelOverlayClick);
}

export function closeModal(modalObj) {
  modalObj.style.display = "none";
  modalObj.classList.remove("modal");
}
