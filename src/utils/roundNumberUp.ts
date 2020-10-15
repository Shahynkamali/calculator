const roundNumberUp = (number: number): number => (Math.round((number + Number.EPSILON) * 100) / 100);

export default roundNumberUp;
