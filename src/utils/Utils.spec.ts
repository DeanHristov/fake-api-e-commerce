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

  it('Should be able to return positive result if some of the fields are null or undefined', () => {
    expect(Utils.isMissingFields(['', null])).toBeTruthy();
    expect(Utils.isMissingFields(['', undefined])).toBeTruthy();
    expect(Utils.isMissingFields([null, undefined])).toBeTruthy();
    expect(Utils.isMissingFields([])).toBeTruthy();
  });

  it('Should be able to return negative result if the fields are not null or undefined', () => {
    expect(Utils.isMissingFields(['', 1])).toBeFalsy();
    expect(Utils.isMissingFields([''])).toBeFalsy();
    expect(Utils.isMissingFields([{}])).toBeFalsy();
    expect(Utils.isMissingFields([true])).toBeFalsy();
    expect(Utils.isMissingFields([false])).toBeFalsy();
  });
});
