# Calculator Requisitions

# Recipe Model
Recipe should have following data attributes
 1. name => Type: String
 2. ingredients => Type: Array of Type: Ingredient
 3. solventName => Type: String
 4. solventNumberWithUnit => Type: NumberWithUnit
 5. desiredVolume => Type:NumberWithUnit

# Recipe Functionallity
The Recipe Model should be able to
* Add a ingredient
* Remove a ingredient
* Return true if a Recipe contains a ingredient with solid units
* Calculate a sum value of all amount to put values converted in MilliLiters
* Set a desired Volume ( On Change, it should Trigger the Calculate Solvent Amount )
* Calculate the Solvent Amount (This should be a computed amount that gets calculated every time the Desired Volume gets changed )


# Calculate The Solvent Amount for all liquid ingredients ( Computed Value )
1. Get the Desired Volume and convert it to milliLiters
2. Get the sum value of all Amounts to Put in milliliters
3. subtract the sum value of the desires volume
4. convert it to the best unit possible using the convert library
5. return a number with unit with the outcome of the conversion
6. if the desired volume changes, it should trigger this function to run again.

# Calulate the sum of all amounts to put
1. Loop over all the ingredients and collect the amount to put
2. use the convertion library to convert all the amount to put from their original unit to MilliLiters
2. use calculate the sum of all those conversions and return that value


# Ingredient Model
Recipe should have following data attributes
 1. componentName => Type: String
 2. ID => Type: String
 3. inititalConcentration => Type: NumberWithUnit
 4. desiredConcentration => Type: NumberWithUnit
 5. amountToPut => Type:NumberWithUnit

# Ingredient Functionallity
The Ingredient Model should be able to
* Set a Initital Concentration Value
* Set a desired Concentration Value
* Return true if a Ingredient contains only liquid units
* should perform a check for the state of the ingredients to delegate which calculation to perform
* Calculate a amount to put value for liquid units
* Calculate a amount to put value for solid units
* If the values of Initital Concentration or Desired Concentration change, this should the calculation for amount to put to run again


# Calulcate amount to put
1. get the Initial concentration
2. get the desired concentration
3. get the desired volume from the Recipe Model
4. In order to calculate the amount to put:
	* Init concentration and desired concentration have to be of the same category
	* Init concentration needs to be of higher scale then desired Concentration
	* Convert both units to the same scale to make this check if this is a valid formula
5. calculate the amount to put by muliplying desired volume by desired concentraton and devide it by init concentration
6. return the best possible outcome by using the conversion library
7. this method should run every time a value within init concentration of desired concentration changes



# Todo
create a select for liquid or solid
