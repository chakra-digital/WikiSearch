import {
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
} from './searchBar.js';
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchResults.js';
import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  //  3 listeners, about clear text
  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);
  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);
  clear.addEventListener('keydown', clearPushListener);

  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

// Procedural "workflow" function
const submitTheSearch = event => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};

// Jammin around ⚡️

// const salonServices = [
//   {
//     service: 'baleage',
//     price: 300,
//   },
//   {
//     service: 'haircut',
//     price: 75,
//   },
//   {
//     service: 'wash',
//     price: 40,
//   },
//   {
//     service: 'rinse',
//     price: 20,
//   },
// ];

// const serviceNames = salonServices.service;
// console.log(serviceNames);

// salonServices.sort(
//   (firstItem, secondItem) => firstItem.service - secondItem.service
// );
// console.log(salonServices);

// const students = [
//   { name: 'Alex', grade: 15 },
//   { name: 'Devlin', grade: 15 },
//   { name: 'Eagle', grade: 13 },
//   { name: 'Sam', grade: 14 },
// ];

// students.sort((firstItem, secondItem) => firstItem.grade - secondItem.grade);

// console.log(students);
