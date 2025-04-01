const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: '61d5fff1-2f3d-4042-8577-25fe07acbd29',
    'Content-Type': 'application/json'
  }
}

export function getUserInfo() {
  return tryFetch(`${config.baseUrl}/users/me`, 'GET', config.headers);
}

export function getInitialCards() {
  return tryFetch(`${config.baseUrl}/cards`, 'GET', config.headers)
}

export function setUserInfo(name, about) {
  return tryFetch(
    `${config.baseUrl}/users/me`, 
    'PATCH', 
    config.headers,
    { name, about }
  );
}

export function createCard(name, link) {
  return tryFetch(
    `${config.baseUrl}/cards`,
    'POST',
    config.headers,
    { name, link }
  ); 
}

export function removeCard(cardId) {
  return tryFetch(
    `${config.baseUrl}/cards/${cardId}`,
    'DELETE',
    config.headers
  );
}

function tryFetch(url, method, headers, data) {
  return fetch(url, { method, headers, body: JSON.stringify(data) })
  .then(res => {
    if (res.ok) { return res.json(); }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.log(err);
  });
}

