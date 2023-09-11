const BASE_URL = 'http://numbersapi.com';

async function showNumberTrivia(num) {
  const resp = await fetch(`${BASE_URL}/${num}?json`);

  const data = await resp.json();

  console.log(data.text);
}

function showNumberRace(num1, num2, num3, num4) {
  const num1trivia = fetch(`${BASE_URL}/${num1}?json`);
  const num2trivia = fetch(`${BASE_URL}/${num2}?json`);
  const num3trivia = fetch(`${BASE_URL}/${num3}?json`);
  const num4trivia = fetch(`${BASE_URL}/${num4}?json`);

  const answerPromise = Promise.race([num1trivia, num2trivia, num3trivia, num4trivia]);

  answerPromise.then(function logWinner(winner) {
    winner.json().then(winningResponse => {
      console.log("winningResponse=", winningResponse.text);
    }
    );
  });
}