"use strict"

let deckId;

const BASE_URL = 'https://deckofcardsapi.com/api/deck'
const GET_CARD_BUTTON = document.querySelector('#get-card-form');

async function getNewDeck() {
  console.debug('getNewDeck');

  const resp = await fetch(`${BASE_URL}/new/shuffle`);
  const data = await resp.json();

  deckId = data.deck_id;
}

async function drawCard() {
  console.debug('drawCard');

  const resp = await fetch(`${BASE_URL}/${deckId}/draw`);
  const data = await resp.json();

  return data.cards[0].image;
}


GET_CARD_BUTTON.addEventListener('submit', )

await getNewDeck();