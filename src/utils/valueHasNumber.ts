const valueHasNumber = (number: string) => !!(number.replace(/[^0-9]/g, '').length > 0);

export default valueHasNumber;
