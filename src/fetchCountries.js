export function countryAPI(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
