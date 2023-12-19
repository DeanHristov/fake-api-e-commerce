import Utils from './Utils';

describe('Class / Utils', () => {
  it('Should return null', () => {
    expect(Utils.isNull(null)).toBeTruthy();
    expect(Utils.isNull(undefined)).toBeTruthy();
    expect(Utils.isNull(-1)).toBeTruthy();
  });

  it('Should not be a null when pass input', () => {
    expect(Utils.isNotNull({})).toBeTruthy();
    expect(Utils.isNotNull([])).toBeTruthy();
    expect(Utils.isNotNull(1)).toBeTruthy();
    expect(Utils.isNotNull(false)).toBeTruthy();
  });

  it('Should return an empty', () => {
    expect(Utils.isEmpty(null)).toBeTruthy();
    expect(Utils.isEmpty({})).toBeTruthy();
    expect(Utils.isEmpty([])).toBeTruthy();
  });

  it('Should not be an empty', () => {
    expect(Utils.isNotEmpty({ key: 'value' })).toBeTruthy();
    expect(Utils.isNotEmpty([1, 2, 3])).toBeTruthy();
  });
});
