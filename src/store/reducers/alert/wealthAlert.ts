import { StoreEvents } from "store/types/types";
import { AlertVariants, GenericAlert } from "types/types";

const Init = {
  variant: AlertVariants.success,
  show: false,
  text: "",
  type: "",
};

export function wealthAlertReducer(
  state: GenericAlert = Init,
  action: StoreEvents
): GenericAlert {
  switch (action.type) {
    case "TOGGLE_WEALTH_ALERT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default wealthAlertReducer;
