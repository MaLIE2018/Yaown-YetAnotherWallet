export function noteModalReducer(state: boolean = false, action: any): boolean {
  switch (action.type) {
    case "TOGGLE_NOTE_MODAL":
      return !state;
    default:
      return state;
  }
}

export default noteModalReducer;
