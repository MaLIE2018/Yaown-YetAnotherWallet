export function categoryModalReducer(
  state: boolean = false,
  action: any
): boolean {
  switch (action.type) {
    case "TOGGLE_CATEGORY_MODAL":
      return !state;
    default:
      return state;
  }
}

export default categoryModalReducer;
