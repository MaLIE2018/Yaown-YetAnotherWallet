import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
});

export default allReducers;
