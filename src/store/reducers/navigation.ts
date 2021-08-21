function navigationReducer(state: string = "cash", action: any): string {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload;
    default:
      return state;
  }
}

export default navigationReducer;
