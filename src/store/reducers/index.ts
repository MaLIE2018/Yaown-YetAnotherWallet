import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";
import trackerReducer from "./showTracker";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
  showTracker: trackerReducer,
});

export default allReducers;
