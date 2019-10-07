import { TMDB_API } from 'react-native-dotenv';

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + TMDB_API + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + TMDB_API + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getFilmTrailerFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + TMDB_API + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}