import { Settings } from "../../types/types";

const Init = {
  accessToken: "",
  refreshToken: "",
};

function settingsReducer(state: Settings = Init, action: any): Settings {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
