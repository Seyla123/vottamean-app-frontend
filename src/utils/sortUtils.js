// utils/sortUtils.js
export const sortByField = (array, field, ascending = true) => {
  return array.slice().sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1;
    if (a[field] > b[field]) return ascending ? 1 : -1;
    return 0;
  });
};
