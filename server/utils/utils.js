import axios from 'axios';

class Utils {
  static async getData (url) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static getDecimalsFromNumber (number) {
    number = Math.abs(parseFloat(number));
    const decimalNumber = number - Math.floor(number);
    return parseInt(decimalNumber * 100);
  }
}

export default Utils;
