import { StoreEvents } from "store/types/types";
import { Settings } from "../../types/types";

const Init = {
  accessToken: "",
  refreshToken: "",
  user: {},
};

function settingsReducer(
  state: Settings = Init,
  action: StoreEvents
): Settings {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
