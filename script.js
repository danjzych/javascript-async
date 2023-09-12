"use strict";

const BASE_URL = 'http://numbersapi.com';


async function showNumberTrivia(num) {
  const resp = await fetch(`${BASE_URL}/${num}?json`);

  const data = await resp.json();

  console.log("showNumberTrivia: ", data.text);
}


async function showNumberRace(num1, num2, num3, num4) {
  const num1trivia = fetch(`${BASE_URL}/${num1}?json`);
  const num2trivia = fetch(`${BASE_URL}/${num2}?json`);
  const num3trivia = fetch(`${BASE_URL}/${num3}?json`);
  const num4trivia = fetch(`${BASE_URL}/${num4}?json`);

  const answerPromise = await Promise.race([num1trivia, num2trivia, num3trivia, num4trivia]);
  const raceWinner = await answerPromise.json()

  console.log("showNumberRace: ", raceWinner.text);
}


async function showNumberAll(num1, num2, num3, num4="WRONG") {
  // console.debug('showNumberAll');

  const num1trivia = fetch(`${BASE_URL}/${num1}?json`);
  const num2trivia = fetch(`${BASE_URL}/${num2}?json`);
  const num3trivia = fetch(`${BASE_URL}/${num3}?json`);
  const num4trivia = fetch(`${BASE_URL}/${num4}?json`);

  const results = await Promise.allSettled([num1trivia, num2trivia, num3trivia, num4trivia]);

  const okPromises = results
    .filter(promise => promise.status === 'fulfilled' && promise.value.ok)
    .map(promise => promise.value.json());

  const okJSON = await Promise.all(okPromises);
  const okText = okJSON.map(json => json.text);
  console.log("showNumberAllFulfilled: ", okText);

  const notOkPromises = results
    .filter(promise => !promise.value.ok)
    .map(promise => `Request failed with status code ${promise.value.status}`);

    console.log("showNumberAllRejected: ", notOkPromises);
}


async function main(num1, num2, num3, num4) {
  await showNumberTrivia(num1);
  await showNumberRace(num1, num2, num3, num4);
  await showNumberAll(num1, num2, num3);
}