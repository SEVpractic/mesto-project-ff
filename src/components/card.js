import * as modal from "./modal";

export function createCard(cardData = {}, removeCard, setLike, showImg) {
  const templateContent = document.querySelector("#card-template").content;
  const card = templateContent.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardRemoveBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardImg.src = cardData.link || "";
  cardTitle.textContent = cardData.name || "";

  cardLikeBtn.addEventListener("click", () => setLike(cardLikeBtn));
  cardRemoveBtn.addEventListener("click", () => removeCard(card));
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
