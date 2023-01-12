import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
console.log('wwwwwed');
function onInput() {
  const searchCountry = countryAPI(inputCountry.value).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length > 0 && data.length <= 10) {
      const a = outputCountries(data);
      // console.log(data, capital, population, flags, 'a:', a);
      countryList.innerHTML = outputCountries(data);
    } else if (data.length === 1) {
    }
  });
}
function countryAPI(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
function outputCountries(data) {
  //console.log('outputCountries:', data);
  const markup = data
    .map(country => {
      return `
        <li>
        <img src='${country.flags.svg}' alt='flag' width="60" height="60">
        <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  console.log('markup', markup);
  return markup;
}
function outputCountry(data) {
  return `<img src='${data.flags.svg}' alt='flag' width="60" height="60">`;
}
