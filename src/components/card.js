export function createCard(myId, cardData = {}, removeCard, setLike, showImg) {
  const templateContent = document.querySelector("#card-template").content;
  const card = templateContent.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardRemoveBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");
  const cardCount = card.querySelector(".card__like-count");

  cardImg.src = cardData.link || "";
  cardTitle.textContent = cardData.name || "";

  cardCount.textContent = cardData.likes.length;
  if (cardData.likes.includes(el => el === myId)) { setLike(cardLikeBtn); }

  if (cardData.owner._id === myId) {
    cardRemoveBtn.addEventListener("click", () => removeCard(card, cardData._id));
  } else {
    cardRemoveBtn.remove();
  }

  cardLikeBtn.addEventListener("click", () => setLike(cardLikeBtn));  
  showImg(cardImg, cardTitle);

  return card;
}

export function removeCard(card) {
  if (!card) return;
  card.remove();
}

export function setLike(cardLikeBtn) {
  cardLikeBtn.classList.toggle("card__like-button_is-active");
}
