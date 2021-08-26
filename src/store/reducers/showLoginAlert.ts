import { StoreEvents } from "store/types/types";
import { AlertVariants, GenericAlert } from "types/types";

const Init = {
  variant: AlertVariants.success,
  show: false,
  text: "",
};

export function showLoginAlertReducer(
  state: GenericAlert = Init,
  action: StoreEvents
): GenericAlert {
  switch (action.type) {
    case "TOGGLE_LOGIN_ALERT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default showLoginAlertReducer;
