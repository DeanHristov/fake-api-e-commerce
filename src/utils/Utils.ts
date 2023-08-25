export default class Utils {
  /**
   * @description Checking if the value not exists
   * @param {*} val
   * @return {boolean} True if the value doesn't exist otherwise false
   */
  public static isNull(val: any): boolean {
    return val === null || val === undefined;
  }

  /**
   * @description Checking if the value exists
   * @param {*} val
   * @return {boolean} True if the value exist otherwise false
   */
  public static isNotNull(val: any): boolean {
    return val !== null && val !== undefined;
  }

  /**
   * @description Checking if the value exists
   * @param {*} val
   * @return {boolean} True if the array or object is empty otherwise false
   */
  public static isEmpty(val: any): boolean {
    if (Utils.isNull(val)) return true;

    if (!Array.isArray(val) && typeof val === 'object') {
      return Object.values(val).length === 0;
    }

    if (Array.isArray(val)) return val.length === 0;

    return true;
  }

  /**
   * @description Opposite on Utils.isEmpty(<any>)
   * @param {*} val
   * @return {boolean} True if not empty otherwise false
   */
  public static isNotEmpty(val: any): boolean {
    return !Utils.isEmpty(val);
  }
}
