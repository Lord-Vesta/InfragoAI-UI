
export const toTitleCase = (label) => {
  return label
    .toLowerCase()
    .split(/[\s-_\/()]+/) 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');
};
