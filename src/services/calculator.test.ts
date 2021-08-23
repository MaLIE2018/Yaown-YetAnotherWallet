import CalculatorApi from "./calculator";

//const store = { storePersist };
const api = CalculatorApi.getSingleton();

test("something", () => {
  expect(true).toBe(true);
});

describe("Calculator Test", () => {
  beforeAll(() => {
    console.log("Calculator Test");
  });

  test("adds 1 + 2 to equal 3", () => {
    api.appendNumber("1");
    api.chooseOperation("+");
    api.appendNumber("2");
    expect(api.result).toBe("3");
  });

  test("enter 9.2 gives as result 9,2", () => {
    api.clear();
    api.appendNumber("9");
    api.appendNumber(".");
    api.appendNumber("2");

    expect(api.result).toBe("9,2");
  });

  test("Enter 9.22222 gives only 9,22", () => {
    api.clear();
    api.appendNumber("9");
    api.appendNumber(".");
    api.appendNumber("2");
    api.appendNumber("2");
    api.appendNumber("2");
    api.appendNumber("2");
    api.appendNumber("2");

    expect(api.result).toBe("9,22");
    expect(api.calcStr).toBe("9,22");
  });

  test("Enter . gives 0,", () => {
    api.clear();

    api.appendNumber(".");

    expect(api.result).toBe("0,");
  });

  test("Enter -2 + 2 gives 0", () => {
    api.clear();
    api.chooseOperation("-");
    api.appendNumber("2");
    api.chooseOperation("+");
    api.appendNumber("2");

    expect(api.result).toBe("4");
  });

  test("Enter 3, gives 3,", () => {
    api.clear();
    api.appendNumber("3");
    api.appendNumber(",");

    expect(api.result).toBe("3,");
  });
});
