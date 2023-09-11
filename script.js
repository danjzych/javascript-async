const BASE_URL = 'http://numbersapi.com'

async function showNumberTrivia(num) {
  const resp = await fetch(`${BASE_URL}/${num}?json`);

  const data = await resp.json();

  console.log(data.text);
}