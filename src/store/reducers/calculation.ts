function calculationReducer(
  state: (number | string)[] = [],
  action: any
): (number | string)[] {
  const oldState = state;
  const length = state.length;
  switch (action.type) {
    case "SET_CALC":
      return [...action.payload];
    case "REMOVE_LAST":
      if (oldState[length - 1].toString().length > 1) {
        console.log("state[state.length - 1]", oldState[length - 1]);
        return [
          ...oldState.slice(0, -1),
          parseFloat(state[length - 1].toString().slice(0, -1)),
        ];
      } else {
        return [...state.slice(0, -1)];
      }
    case "ADD_ELEMENT":
      if (
        typeof state[state.length - 1] === "number" &&
        action.payload === "," &&
        !state[state.length - 1].toString().includes(".")
      ) {
        return [
          ...oldState.slice(0, -1),
          parseFloat(state[length - 1].toString()).toFixed(1),
        ];
      } else if (
        typeof action.payload === "number" &&
        state[state.length - 1]?.toString().includes(".")
      ) {
        console.log("number");
        return [
          ...oldState.slice(0, -1),
          state[length - 1].toString().slice(0, -1) + action.payload,
        ];
      } else {
        console.log("Test");
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

export default calculationReducer;
