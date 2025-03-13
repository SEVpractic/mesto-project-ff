export function createCard(cardData = {}, removeCard) {
  const templateContent = document.querySelector('#card-template').content;
  const card = templateContent.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardRemoveBtn = card.querySelector('.card__delete-button');

  cardImg.src = cardData.link ? cardData.link : '';
  cardTitle.textContent = cardData.name ? cardData.name : '';

  cardRemoveBtn.addEventListener('click', () => removeCard(card));

  return card;
}

export function removeCard(card) {
  if (!card) return;
  card.remove();
}