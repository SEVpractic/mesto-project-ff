export function createCard(myId, cardData, removeCard, toggleLike, showImg) {
  const templateContent = document.querySelector("#card-template").content;
  const card = templateContent.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardRemoveBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardImg.src = cardData.link || "";
  cardTitle.textContent = cardData.name || "";

  setLike(card, cardData, myId);

  if (cardData.owner._id === myId) {
    cardRemoveBtn.addEventListener("click", () =>
      removeCard(card, cardData._id)
    );
  } else {
    cardRemoveBtn.remove();
  }

  debugger
  cardLikeBtn.addEventListener("click", () =>
    toggleLike(card, cardData)
      .then(res => cardData = res)
  );
  showImg(cardImg, cardTitle);

  return card;
}

export function removeCard(card) {
  if (!card) return;
  card.remove();
}

export function setLike(card, cardData, myId) {
  const cardLikeBtn = card.querySelector(".card__like-button");
  const cardCountElement = card.querySelector(".card__like-count");

  cardCountElement.textContent = cardData.likes.length;

  if (cardData.likes.some((el) => el._id === myId)) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  } else {
    cardLikeBtn.classList.remove("card__like-button_is-active");
  }
}
