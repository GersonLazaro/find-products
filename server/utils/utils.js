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
    const intNumber = parseInt(number);
    return Number((number - intNumber).toFixed(Math.abs(('' + number).length - ('' + number).length - 1)));
  }
}

export default Utils;
