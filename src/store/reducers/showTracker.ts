export function trackerReducer(state: boolean = false, action: any): boolean {
  switch (action.type) {
    case "TOGGLE_TRACKER":
      return !state;
    default:
      return state;
  }
}

export default trackerReducer;
