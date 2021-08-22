export const getResult = (calcArr: any[]): string => {
  let result: number = 0;
  let i: number = 0;
  if (!/[/*-+]/.test(calcArr[calcArr.length - 1])) {
    while (i < calcArr.length) {
      if (i === 0 && Number(calcArr[i])) {
        result = calcArr[i];
        i++;
      }
      if (calcArr[i] === "+") {
        result = result + calcArr[i + 1];
        i = i + 2;
      } else if (calcArr[i] === "-") {
        result = result - calcArr[i + 1];
        i = i + 2;
      } else if (calcArr[i] === "*") {
        result = result * calcArr[i + 1];
        i = i + 2;
      } else if (calcArr[i] === "/") {
        result = result / calcArr[i + 1];
        i = i + 2;
      }
    }
  } else {
    result = calcArr[0].toString();
  }

  return result.toString();
};
