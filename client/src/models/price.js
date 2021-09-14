/**
 * Price Model
 */
export class PriceModel {
  /**
   * Constructor for Price Model
   * @param {String} currency - Currency description
   * @param {Number} amount - Integer part of amount
   * @param {Number} decimals - Decimal part of amount 
   */
  constructor (currency, amount, decimals) {
    this.currency = this.getCurrency(currency);
    this.amount = amount;
    this.decimals = decimals;
  }

  /**
   * Get the currency to display in the UI
   * @param {String} currency - Money denomination
   * @returns Currency
   */
  getCurrency (currency) {
    if (currency === 'USD') return 'USD $';
    else if (currency === 'EUR') return '€';
    else if (currency === 'JPY') return '¥';
    else if (currency === 'GBP') return '£';
    else return '$';
  }

  /**
   * Get the price
   * @returns price
   */
  getPrice () {
    return new Intl.NumberFormat('es-CO').format(this.amount) + (this.decimals !== 0 ? ',' + this.decimals : '');
  }
}
