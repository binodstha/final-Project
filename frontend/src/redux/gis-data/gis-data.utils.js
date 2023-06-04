export const getCategoryList = (autoSuggestion) => {
  return autoSuggestion.map((suggestion) => suggestion.term);
};

export const getActiveCategory = (autoSuggestion) => {
  return autoSuggestion.find((suggestion) => suggestion.isChecked);
};

export const getRoutingValue = (label, value) => {
  return {
    label: label,
    value: value,
  };
};

export const updateActiveCategory = (autoSuggestion, term) => {
  return autoSuggestion.map((suggestion) => {
    suggestion.isChecked = suggestion.term === term;
    return suggestion;
  });
};
