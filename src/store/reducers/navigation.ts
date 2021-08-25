import { StoreEvents } from "store/types/types";

function navigationReducer(
  state: string = "cash",
  action: StoreEvents
): string {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload;
    default:
      return state;
  }
}

export default navigationReducer;
