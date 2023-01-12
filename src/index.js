import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { countryAPI } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (!inputCountry.value.trim()) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  const searchCountry = countryAPI(inputCountry.value.trim())
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = outputCountries(data);
      } else if (data.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = outputCountry(data);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}
// function countryAPI(country) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,languages,flags`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }
function outputCountries(data) {
  const markup = data
    .map(country => {
      return `
        <li>
        <img src='${country.flags.svg}' alt='flag' width="60" height="60">
        <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  // console.log('markup', markup);
  return markup;
}
function outputCountry(data) {
  const markup = data
    .map(country => {
      return `
       <div>
        <img src='${country.flags.svg}' alt='flag' width="40" height="40">
        <h1 class='flag-header'>${country.name.official}</h1>
        <p><span class='text'>Capital: </span> ${country.capital}</p>
        <p><span class='text'>Population: </span>${country.population}</p>
        <p><span class='text'>Languages: </span>${Object.values(
          country.languages
        )}</p>
        </div>`;
    })
    .join('');
  console.log('markup', markup);
  return markup;
}
