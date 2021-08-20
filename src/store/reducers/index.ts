import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";
import trackerReducer from "./showTracker";
import noteModalReducer from "./showModal";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
  showTracker: trackerReducer,
  showModal: noteModalReducer,
});

export default allReducers;
