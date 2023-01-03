const debounce = require('lodash.debounce');
import Notiflix, { Notify } from 'notiflix';
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};
import markupService from './markUpService';
const markUpService = new markupService();

refs.input.addEventListener('input', debounce(searchCountry, 300));

function searchCountry() {
  markUpService.remove(refs.list);
  markUpService.remove(refs.container);
  if (refs.input.value.trim() === '') {
    Notify.warning('please enter the name');
    return;
  }

  fetch(
    `https://restcountries.com/v2/name/${refs.input.value.trim()}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length < 11) {
        let markup = markUpService.makeList(data);
        markUpService.add(markup, refs.list);
      } else if (data.length === 1) {
        let markup = markUpService.makeInfo(data);
        markUpService.add(markup, refs.container);
      }
    })
    .catch(error => {
      Notify.warning('Oops, there is no country with that name');
    });
}
