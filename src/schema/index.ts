import Unit from '@/models/Unit';
import Dropdown from '@/models/Dropdown';
import Children from '@/models/Children';

const molar = new Children(
  'Molar Concentrations',
  [new Unit('nM'), new Unit('µM'), new Unit('mM'), new Unit('M')],
  'liquid',
);

const weight = new Children(
  'Weight / Volume Concentrations',
  [new Unit('μg/μL'), new Unit('μg/mL'), new Unit('mg/mL'), new Unit('g/L')],
  'liquid',
);

const other = new Children(
  'Volume per Volume',
  [new Unit('U/mL'), new Unit('X'), new Unit('%')],
  'liquid',
);

const solids = new Children(
  'Solid Concentrations',
  [new Unit('g/mol'), new Unit('%/(s)')],
  'solid',
);

const liquidCategories = new Children('liquid', [molar, weight, other]);
const solidCategories = new Children('solid', [solids]);
const children = [liquidCategories, solidCategories];
const unitsSchema = new Dropdown(children);

// const unitsSchema = {
//   children: [
//     {
//       label: 'Liquid',
//       children: [
//         {
//           label: 'Molar Concentrations',
//           state: 'liquid',
//           children: [
//             new Unit('nM'),
//             new Unit('µM'),
//             new Unit('mM'),
//             new Unit('M'),
//           ],
//         },
//         {
//           label: 'Weight / Volume Concentrations',
//           state: 'liquid',
//           children: [
//             new Unit('μg/μL'),
//             new Unit('μg/mL'),
//             new Unit('mg/mL'),
//             new Unit('g/L'),
//           ],
//         },
//         {
//           label: 'Other Liquid Concentrations',
//           state: 'liquid',
//           children: [
//             new Unit('U/mL'),
//             new Unit('X'),
//             new Unit('%'),
//           ],
//         },
//       ],
//     },
//     {
//       label: 'Solid',
//       children: [
//         {
//           label: 'Solid Concentrations',
//           state: 'solid',
//           children: [
//             new Unit('%/(s)'),
//             new Unit('g/mol'),
//           ],
//         },
//       ],
//     },
//   ],
// };

const volumeLiquidUnits = [
  new Unit('L'), new Unit('mL'), new Unit('μL'), new Unit('nL'),
];

const stateOptions = [new Unit('liquid'), new Unit('solid')];

const volumeSolidUnits = [
  new Unit('g'), new Unit('mG'), new Unit('μg'),
];

const labelsSchema: Array<string> = [
  'component name',
  'state of component',
  'inital concentration / molecular weight',
  'desired concentration',
  'amount to put',
];

// const FormSchema: Array<object> = [
//   {
//     fieldType: 'BaseInput',
//     name: '_componentName',
//     class: 'input input--medium',
//     type: 'text',
//   },
//   {
//     fieldType: 'BaseSelect',
//     name: '_state',
//     options: stateOptions,
//   },
//   {
//     fieldType: 'InputAndDropdown',
//     name: '_initConcentrationOrMolecularWeight',
//     dropdownSchema: children,
//     type: 'number',
//   },
//   {
//     fieldType: 'InputAndDropdown',
//     name: '_desiredConcentration',
//     dropdownSchema: children,
//     type: 'number',
//   },
//   {
//     fieldType: 'InputAndLabel',
//     name: '_amountToPut',
//     readonly: true,
//   },
// ];


export {
  labelsSchema, unitsSchema, volumeLiquidUnits, volumeSolidUnits, children, stateOptions,
};
