import { StoreEvents } from "store/types/types";

export function addAssetReducer(
  state: boolean = false,
  action: StoreEvents
): boolean {
  switch (action.type) {
    case "TOGGLE_ADD_ASSET_PAGE":
      return !state;
    default:
      return state;
  }
}

export default addAssetReducer;
