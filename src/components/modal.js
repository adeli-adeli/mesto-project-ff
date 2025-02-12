// Находим форму в DOM

import { handleCloseButton, popupAll } from "..";

// функция открытия popup

export function openModal(modalObj) {
  modalObj.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscButton);
  modalObj.addEventListener("click", handleOverlayClick);
}

// функция закрытия popup

export function closeModal() {
  popupAll.forEach((popup) => {
    if (popup.classList.contains("popup_is-opened")) {
      popup.classList.remove("popup_is-opened");

      popup.removeEventListener("click", handleCloseButton);
      popup.removeEventListener("click", handleOverlayClick);
    }
  });
  document.removeEventListener("keydown", handleEscButton);
}

// закрытие popup на кнопку

export function handleEscButton(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

// закрытие popup на оверлей

export function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
