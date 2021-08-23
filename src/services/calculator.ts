import { store } from "store/store";

class CalculatorApi {
  public result: string;
  public calcStr;
  private calcArr: string[];
  private static singleton: CalculatorApi;
  private operators: string[];

  constructor() {
    this.result = "0";
    this.calcStr = "";
    this.calcArr = [];
    this.operators = ["/", "*", "-", "+"];
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
    this.calcStr = "";
  }

  delete() {
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (this.calcArr.length === 0) return;
    if (lstEle.toString().length > 1) {
      this.calcArr = [
        ...this.calcArr.slice(0, -1),
        lstEle.toString().slice(0, -2),
      ];
      this.getCalculationString();
    } else {
      this.calcArr = [...this.calcArr.slice(0, -2)];
      this.getCalculationString();
    }
    const newLast = this.calcArr[this.calcArr.length - 1];

    if (!this.operators.includes(newLast)) {
      this.getResult();
      this.getCalculationString();
    }
    if (this.calcStr === "") {
      store.dispatch({
        type: "SET_RESULT",
        payload: "0",
      });
    }
  }

  getCalculationString() {
    const regex = /[.]/;
    const newCalcArr = this.calcArr.map((op) => op.replace(regex, ","));
    this.calcStr = newCalcArr.join(" ");
    store.dispatch({
      type: "SET_CALC_STR",
      payload: this.calcStr,
    });
  }

  chooseOperation(operation: string) {
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (this.calcArr.length === 0) return;
    if (this.operators.includes(lstEle)) {
      this.calcArr = this.calcArr.slice(0, -1);
      this.calcArr.push(operation);
    } else {
      this.calcArr.push(operation);
    }
    this.getCalculationString();
  }

  appendNumber(number: string) {
    const lstEle = this.calcArr[this.calcArr.length - 1];
    console.log("this.calcArrSTart:", this.calcArr);
    if (number === "." && lstEle?.includes(".")) return;

    if (lstEle !== undefined && !this.operators.includes(lstEle)) {
      if (lstEle.includes(".") && lstEle.split(".")[1].length >= 2) {
        this.calcArr = [
          ...this.calcArr.slice(0, -1),
          lstEle.slice(0, -1).toString() + number,
        ];
      } else {
        this.calcArr = [
          ...this.calcArr.slice(0, -1),
          lstEle.toString() + number,
        ];
      }
      this.getResult();
      this.getCalculationString();
    } else {
      if (number === "." && this.calcArr.length === 0) {
        this.calcArr.push("0" + number);
      } else {
        this.calcArr.push(number);
      }
      this.getResult();
      this.getCalculationString();
    }
    console.log("this.calcArrEnd:", this.calcArr);
  }

  getResult() {
    let i: number = 0;
    const lstEle = this.calcArr[this.calcArr.length - 1];
    if (this.operators.includes(lstEle)) return;

    while (i < this.calcArr.length) {
      if (i === 0) {
        if (this.calcArr[i] === ".") {
          this.result = "0.";
        } else {
          this.result = this.calcArr[i];
        }
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
    const split = this.result.split(".");

    if (split[1] !== undefined && split[1].length > 2) {
      this.result = parseFloat(this.result).toFixed(2).replace(".", ",");
    } else if (split[1] !== undefined) {
      this.result = this.result.replace(".", ",");
    }
    if (this.calcArr.length === 1 && this.result === "0") {
      this.result = "0,";
    }
    store.dispatch({
      type: "SET_RESULT",
      payload: this.result,
    });
  }
}

export default CalculatorApi;
