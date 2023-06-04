class Helper {
  static titleFormatter = (params/*, hash*/) => {
    if (params) {
      let str = params.replace(/_/g, " ");
      str = str.replace(/-/g, " ");
      return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    } else
      return params
  }

  static isColError = (colName, errors) => {
    console.log(errors)
    return errors.some(el => el.code === colName)
  }

  static getErrorMsg = (colName, errors) => {
    const errMsg = errors.find(el => el.code === colName)
    return errMsg ? errMsg.detail : "";
  }

  static numberFormatter = (number) => {
    if (parseInt(number) >= 1000000000) {
      return (parseInt(number) / 1000000000).toFixed(2).replace(/\.0$/, '') + "G";
    }
    if (parseInt(number) >= 1000000) {
      return (parseInt(number) / 1000000).toFixed(2).replace(/\.0$/, '') + "M";
    }
    if (parseInt(number) >= 1000) {
      return (parseInt(number) / 1000).toFixed(2).replace(/\.0$/, '') + "K";
    }
    return parseInt(number).toFixed(2).replace(/\.0$/, '');
  }
}

export default Helper;