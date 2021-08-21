import { Settings } from "../../types/types";

const Init = {
  accessToken: "",
};

function settingsReducer(state: Settings = Init, action: any): Settings {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

export default settingsReducer;
