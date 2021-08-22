import { storePersist } from "../store/store";

class CalculatorApi {
  public result: string;
  public calcStr;
  private calcArr: string[];
  private static singleton: CalculatorApi;
  private storePersist: any;

  constructor() {
    this.storePersist = storePersist();
    this.result = "0";
    this.calcStr = "";
    this.calcArr = [];
  }

  public static getSingleton(): CalculatorApi {
    if (!CalculatorApi.singleton) {
      CalculatorApi.singleton = new CalculatorApi();
    }
    return CalculatorApi.singleton;
  }

  clear() {
    this.calcArr = [];
    this.result = "0";
    this.calcStr = "0";
  }

  delete() {
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (this.calcArr.length === 0) return;
    if (lstEle.toString().length > 1) {
      this.calcArr = [
        ...this.calcArr.slice(0, -1),
        lstEle.toString().slice(0, -1),
      ];
    } else {
      this.calcArr = [...this.calcArr.slice(0, -1)];
    }
    const newLast = this.calcArr[this.calcArr.length - 1];

    if (!/([/*+-])/.test(newLast)) {
      this.getResult();
      this.getCalculationString();
    }
  }

  getCalculationString() {
    const regex = /[.]/;
    const newCalcArr = this.calcArr.map((op) => op.replace(regex, ","));
    this.calcStr = newCalcArr.join(" ");
    this.storePersist.store.dispatch({
      type: "SET_CALC_STR",
      payload: this.calcStr,
    });
    return this.calcStr;
  }

  chooseOperation(operation: string) {
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (this.calcArr.length === 0) return;

    if (/([/*+-])/.test(lstEle)) {
      this.calcArr = this.calcArr.slice(0, -1);
      this.calcArr.push(operation);
    } else {
      this.calcArr.push(operation);
    }
    this.getCalculationString();
    console.log("this.calcArr:", this.calcArr);
  }

  appendNumber(number: string) {
    console.log(number);
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (number === "." && lstEle.includes(".")) return;

    if (lstEle !== undefined && !/([/*+-])/.test(lstEle)) {
      this.calcArr = [...this.calcArr.slice(0, -1), lstEle.toString() + number];
    } else {
      this.calcArr.push(number);
      this.getResult();
    }
    this.getCalculationString();
    console.log("this.calcArr:", this.calcArr);
  }

  getResult() {
    let i: number = 0;
    const lstEle = this.calcArr[this.calcArr.length - 1];

    if (/([/*+-])/.test(lstEle)) return;

    while (i < this.calcArr.length) {
      if (i === 0) {
        this.result = parseFloat(this.calcArr[i]).toString();
        i++;
      }
      if (this.calcArr[i] === "+") {
        this.result = (
          parseFloat(this.result) + parseFloat(this.calcArr[i + 1])
        ).toString();
        i = i + 2;
      } else if (this.calcArr[i] === "-") {
        this.result = (
          parseFloat(this.result) - parseFloat(this.calcArr[i + 1])
        ).toString();
        i = i + 2;
      } else if (this.calcArr[i] === "*") {
        this.result = (
          parseFloat(this.result) * parseFloat(this.calcArr[i + 1])
        ).toString();
        i = i + 2;
      } else if (this.calcArr[i] === "/") {
        this.result = (
          parseFloat(this.result) / parseFloat(this.calcArr[i + 1])
        ).toString();
        i = i + 2;
      }
    }
    this.storePersist.store.dispatch({
      type: "SET_RESULT",
      payload: parseFloat(this.result).toFixed(2),
    });
    console.log("this.result.toString():", this.result.toString());
    return this.result.toString();
  }
}

export default CalculatorApi;
