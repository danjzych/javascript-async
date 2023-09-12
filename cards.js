"use strict";

let deckId;

const BASE_URL = 'https://deckofcardsapi.com/api/deck';
const $cardForm = $('#get-card-form');
const $cardContainer = $('#card-container');

/** Get deck-id from API */
async function getNewDeck() {
  console.debug('getNewDeck');

  const resp = await fetch(`${BASE_URL}/new/shuffle`);
  const data = await resp.json();

  deckId = data.deck_id;
}

/** Get a card from shuffled deck from API */
async function drawCard() {
  console.debug('drawCard');

  const resp = await fetch(`${BASE_URL}/${deckId}/draw`);
  const data = await resp.json();

  return { image: data.cards[0].image, remaining: data.remaining };
}

/** Append card to DOM and hide button after deck is empty */
async function handleCardClick(evt) {
  evt.preventDefault();

  const $card = await drawCard();
  const $newCard = $(`<img src="${$card.image}">`);
  $cardContainer.prepend($newCard);

  if ($card.remaining === 0) {
    $cardForm.hide();
  }
}

$cardForm.on('submit', handleCardClick);

getNewDeck();
