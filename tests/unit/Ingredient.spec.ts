// import Ingredient from '@/models/Ingredient';
// import NumberWithUnit from '@/models/NumberWithUnit';

// describe('Ingredient Model', () => {
//   it('should be able to to assign a number with unit to Init Concentration and Desired Concentration', () => {
//     const initConcentration = new NumberWithUnit(100, 'nM');
//     const desiredConcentration = new NumberWithUnit(10, 'nM');
//     const ingredient = new Ingredient('butter', initConcentration, desiredConcentration);
//     expect(ingredient.desiredConcentration).toBeInstanceOf(NumberWithUnit);
//     expect(ingredient.initConcentrationOrMolecularWeight).toBeInstanceOf(NumberWithUnit);
//   });

//   it('should be able to tell the state of the ingredient', () => {
//     const initConcentration = new NumberWithUnit(100, 'nM');
//     const desiredConcentration = new NumberWithUnit(10, 'nM');
//     const ingredient = new Ingredient('butter', initConcentration, desiredConcentration);
//     expect(ingredient.isIngredientLiquid).toBeTruthy();
//   });

//   it('should be able to calculate the amount to put for liquid matters', () => {
//     const initConcentration = new NumberWithUnit(100, 'M');
//     const desiredConcentration = new NumberWithUnit(20, 'M');
//     const desiredVolume = new NumberWithUnit(10, 'L');
//     const ingredient = new Ingredient('butter', initConcentration, desiredConcentration);
//     ingredient.desiredVolume = desiredVolume;
//     expect(ingredient.desiredConcentration?.stateOfMatter).toBe('liquid');
//     expect(ingredient.desiredConcentration?.stateOfMatter).toBe('liquid');
//     expect(ingredient.amountToPut?.value).toBe(2);
//   });

//   it('should be able to calculate the amount to put for solid matters', () => {
//     const initConcentration = new NumberWithUnit(100, '%/(s)');
//     const desiredConcentration = new NumberWithUnit(20, '%/(s)');
//     const desiredVolume = new NumberWithUnit(10, 'L');
//     const ingredient = new Ingredient('butter', initConcentration, desiredConcentration);
//     ingredient.desiredVolume = desiredVolume;
//     expect(ingredient.desiredConcentration?.stateOfMatter).toBe('solid');
//     expect(ingredient.initConcentrationOrMolecularWeight?.stateOfMatter).toBe('solid');
//     expect(ingredient.amountToPut?.value).toBe(2000);
//     expect(ingredient.amountToPut?.label).toBe('g');
//   });

//   it('should return a instance of numberWithUnit for the the calculated amountToPut', () => {
//     const initConcentration = new NumberWithUnit(100, 'M');
//     const desiredConcentration = new NumberWithUnit(20, 'M');
//     const desiredVolume = new NumberWithUnit(10, 'L');
//     const ingredient = new Ingredient('butter', initConcentration, desiredConcentration);
//     ingredient.desiredVolume = desiredVolume;
//     expect(ingredient.amountToPut).toBeInstanceOf(NumberWithUnit);
//   });
// });
