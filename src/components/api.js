const server = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
  headers: {
    authorization: "6fdbb612-56bf-4ff5-a217-0252595f1a6a",
    "Content-Type": "application/json",
  },
};

//

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

//информация о пользователе

export function getUserInfo() {
  return fetch(`${server.baseUrl}/users/me`, {
    headers: server.headers,
  }).then(handleResponse);
}

//информация о карточках

export function getInitialCard() {
  return fetch(`${server.baseUrl}/cards`, {
    headers: server.headers,
  }).then(handleResponse);
}

//создание новой карточки

export function postNewCard(card) {
  return fetch(`${server.baseUrl}/cards`, {
    method: "POST",
    headers: server.headers,
    body: JSON.stringify(card),
  }).then(handleResponse);
}

//редактирование профиля

export function patchEditProfile(edit) {
  return fetch(`${server.baseUrl}/users/me`, {
    method: "PATCH",
    headers: server.headers,
    body: JSON.stringify(edit),
  }).then(handleResponse);
}

//редоктирования аватара

export function patchEditProfileAvatar(data) {
  return fetch(`${server.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: server.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

//поставить лайк

export function putLikesCard(cardId) {
  return fetch(`${server.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: server.headers,
  }).then(handleResponse);
}

//удалить лайк

export function deleteLikesCard(cardId) {
  return fetch(`${server.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: server.headers,
  }).then(handleResponse);
}

//удалить карточку

export function deleteCardInfo(cardId) {
  return fetch(`${server.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: server.headers,
  }).then(handleResponse);
}
