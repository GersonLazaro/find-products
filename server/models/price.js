/**
 * Price Model
 */
class Price {
  /**
   * Constructor for Price Model
   * @param {String} currency - Currency description
   * @param {Number} amount - Integer part of amount
   * @param {Number} decimals - Decimal part of amount
   */
  constructor (currency, amount, decimals) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }

  /**
   * Covert price object to JSON
   * @returns JSON Object
   */
  toJSON () {
    return {
      currency: this.currency,
      amount: this.amount,
      decimals: this.decimals
    };
  }
}

export default Price;
