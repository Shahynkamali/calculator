import Unit from '@/models/Unit';

describe('Unit Model', () => {
  it('should assign the state of matter of the unit', () => {
    const liquidUnit = new Unit('M');
    const solidUnit = new Unit('%/(s)');
    expect(liquidUnit.stateOfMatter).toBe('liquid');
    expect(solidUnit.stateOfMatter).toBe('solid');
  });
});
