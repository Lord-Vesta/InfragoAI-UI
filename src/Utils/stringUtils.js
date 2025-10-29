export const toTitleCase = (label) => {
  if (!label) return "";

  return label
    .toLowerCase()
    // Split only on spaces, dashes, underscores, or slashes — NOT parentheses
    .split(/[\s-_\/]+/)
    .map((word) => {
      // Keep parentheses as-is
      if (word === "(" || word === ")") return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    // Optional: fix spacing before/after parentheses
    .replace(/\s*\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ") ");
};
