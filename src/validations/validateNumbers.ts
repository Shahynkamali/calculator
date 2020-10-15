const validateNumbers = (numbers: Array<number>): boolean => {
  const isValidNumber = numbers.map((number) => typeof number === 'number' && !Number.isNaN(number) && number > 0);
  const hasInvalidNumber = isValidNumber.some((invalidNumber) => invalidNumber === false);
  return hasInvalidNumber;
};

export default validateNumbers;
