const validateComponentNames = (names: Array<string>, ingredients: any): boolean => (
  names.length === ingredients.length);

export default validateComponentNames;
