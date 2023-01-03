export default class markupService {
  remove(container) {
    container.innerHTML = '';
  }

  add(content, ref) {
    ref.insertAdjacentHTML('beforeend', content);
  }

  makeInfo(array) {
    const language = array[0].languages
      .map(lang => {
        return `${lang.name}`;
      })
      .join(' ,');
    const markup = array
      .map(({ flags: { svg }, name, capital, population } = item) => {
        return `
              <div class="country-info_container">
              <img class="country_img" src="${svg}" width="60px" height="40">
              <p class="country_name">${name}</p>
              </div>
              <p>Capital: ${capital}</p>
              <p>Population: ${population}</p>
              <p>Languages: ${language}</p>
              `;
      })
      .join('');
    return markup;
  }

  makeList(array) {
    const markup = array
      .map(({ flags: { svg }, name } = item) => {
        return `<li class="country_item">
              <img class="country_img" src="${svg}" width="60px" height="40">
              <p class="country_name">${name}</p>
              </li>`;
      })
      .join('');
    return markup;
  }
}
