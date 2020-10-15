// import Recipe from '@/models/Recipe';
// import NumberWithUnit from '@/models/NumberWithUnit';
// import Ingredient from '@/models/Ingredient';

// describe('Variouse solvent calculations', () => {
//   it('should be able to calculate the  amount to put value and solvent for liquid ingredients with molar units', () => {
//     const recipe = new Recipe();
//     recipe.desiredVolume = new NumberWithUnit(100, 'mL');
//     recipe.addIngredient(new Ingredient('MgAc2', new NumberWithUnit(1000, 'mM'), new NumberWithUnit(10, 'mM')));
//     recipe.addIngredient(new Ingredient('KCl', new NumberWithUnit(4000, 'mM'), new NumberWithUnit(50, 'mM')));
//     recipe.addIngredient(new Ingredient('NH4Cl', new NumberWithUnit(1000, 'mM'), new NumberWithUnit(10, 'mM')));
//     recipe.addIngredient(new Ingredient('Hepes-KOH 7.5', new NumberWithUnit(1000, 'mM'), new NumberWithUnit(5, 'mM')));
//     recipe.addIngredient(new Ingredient('DTT', new NumberWithUnit(1000, 'mM'), new NumberWithUnit(1, 'mM')));
//     expect(recipe.ingredients[0].amountToPut?.value).toBe(1);
//     expect(recipe.ingredients[0].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[1].amountToPut?.value).toBe(1.25);
//     expect(recipe.ingredients[1].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[2].amountToPut?.value).toBe(1);
//     expect(recipe.ingredients[2].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[3].amountToPut?.value).toBe(500);
//     expect(recipe.ingredients[3].amountToPut?.label).toBe('μL');
//     expect(recipe.ingredients[4].amountToPut?.value).toBe(100);
//     expect(recipe.ingredients[4].amountToPut?.label).toBe('μL');
//     if (recipe.solventAmount) {
//       expect(recipe.solventAmount.value).toBe(96.15);
//       expect(recipe.solventAmount.label).toBe('mL');
//     }
//   });

//   it('should be able to calculate the amount to put value and solvent value for weight per volume units', () => {
//     const recipe = new Recipe();
//     recipe.desiredVolume = new NumberWithUnit(1, 'L');
//     recipe.addIngredient(new Ingredient('KCl', new NumberWithUnit(40, 'μg/mL'), new NumberWithUnit(5, 'μg/mL')));
//     recipe.addIngredient(new Ingredient('NH4Cl', new NumberWithUnit(10, 'μg/μL'), new NumberWithUnit(1, 'μg/μL')));
//     recipe.addIngredient(new Ingredient('Hepes-KOH 7.5', new NumberWithUnit(50, 'g/L'), new NumberWithUnit(5, 'μg/mL')));
//     recipe.addIngredient(new Ingredient('DTT', new NumberWithUnit(10, 'μg/μL'), new NumberWithUnit(1, 'μg/μL')));
//     const expectedSolventValue = new NumberWithUnit(674.9, 'mL');
//     expect(recipe.ingredients[0].amountToPut?.value).toBe(125);
//     expect(recipe.ingredients[0].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[1].amountToPut?.value).toBe(100);
//     expect(recipe.ingredients[1].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[2].amountToPut?.value).toBe(100);
//     expect(recipe.ingredients[2].amountToPut?.label).toBe('μL');
//     expect(recipe.ingredients[3].amountToPut?.value).toBe(100);
//     expect(recipe.ingredients[3].amountToPut?.label).toBe('mL');
//     expect(recipe.solventAmount).toMatchObject(expectedSolventValue);
//   });

//   it('should be able to calculate the amount to put for liquid and solid ingredients in the same recipe', () => {
//     const recipe = new Recipe();
//     recipe.desiredVolume = new NumberWithUnit(1, 'L');
//     recipe.addIngredient(new Ingredient('MgAc2', new NumberWithUnit(1000, 'mM'), new NumberWithUnit(10, 'mM')));
//     recipe.addIngredient(new Ingredient('KCl', new NumberWithUnit(40, 'μg/mL'), new NumberWithUnit(5, 'μg/mL')));
//     recipe.addIngredient(new Ingredient('NH4Cl', new NumberWithUnit(10, '%/(s)'), new NumberWithUnit(1, '%/(s)')));
//     recipe.addIngredient(new Ingredient('Hepes-KOH 7.5', new NumberWithUnit(50, 'g/mol'), new NumberWithUnit(5, 'M')));
//     recipe.addIngredient(new Ingredient('DTT', new NumberWithUnit(10, 'μg/μL'), new NumberWithUnit(1, 'μg/μL')));
//     expect(recipe.ingredients[0].amountToPut?.value).toBe(10);
//     expect(recipe.ingredients[0].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[0].amountToPut?.stateOfMatter).toBe('liquid');
//     expect(recipe.ingredients[1].amountToPut?.value).toBe(125);
//     expect(recipe.ingredients[1].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[1].amountToPut?.stateOfMatter).toBe('liquid');
//     expect(recipe.ingredients[2].amountToPut?.value).toBe(10);
//     expect(recipe.ingredients[2].amountToPut?.stateOfMatter).toBe('solid');
//     expect(recipe.ingredients[2].amountToPut?.label).toBe('g');
//     expect(recipe.ingredients[3].amountToPut?.value).toBe(250);
//     expect(recipe.ingredients[3].amountToPut?.stateOfMatter).toBe('solid');
//     expect(recipe.ingredients[3].amountToPut?.label).toBe('g');
//     expect(recipe.ingredients[4].amountToPut?.value).toBe(100);
//     expect(recipe.ingredients[4].amountToPut?.stateOfMatter).toBe('liquid');
//     expect(recipe.ingredients[4].amountToPut?.label).toBe('mL');
//     if (recipe.solventAmount) {
//       expect(recipe.solventAmount.value).toBeFalsy();
//     }
//   });

//   it('should calculate and validate other liquid values', () => {
//     const recipe = new Recipe();
//     recipe.desiredVolume = new NumberWithUnit(100, 'mL');
//     recipe.addIngredient(new Ingredient('MgAc2', new NumberWithUnit(10, '%'), new NumberWithUnit(2, '%')));
//     recipe.addIngredient(new Ingredient('KCl', new NumberWithUnit(20, 'X'), new NumberWithUnit(2, 'X')));
//     recipe.addIngredient(new Ingredient('NH4Cl', new NumberWithUnit(100, 'U/mL'), new NumberWithUnit(10, 'U/mL')));
//     expect(recipe.ingredients[0].amountToPut?.value).toBe(20);
//     expect(recipe.ingredients[0].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[1].amountToPut?.value).toBe(10);
//     expect(recipe.ingredients[1].amountToPut?.label).toBe('mL');
//     expect(recipe.ingredients[2].amountToPut?.value).toBe(10);
//     expect(recipe.ingredients[2].amountToPut?.label).toBe('mL');
//     const expectedSolventValue = new NumberWithUnit(60, 'mL');
//     expect(recipe.solventAmount).toMatchObject(expectedSolventValue);
//   });
// });
