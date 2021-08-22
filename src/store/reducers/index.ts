import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";
import trackerReducer from "./showTracker";
import noteModalReducer from "./showNoteModal";
import settingsReducer from "./settings";
import categoryModalReducer from "./showCategoryModal";
import transactionReducer from "./transaction";
import calculationReducer from "./calculation";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
  showTracker: trackerReducer,
  showNoteModal: noteModalReducer,
  settings: settingsReducer,
  showCategoryModal: categoryModalReducer,
  transaction: transactionReducer,
  calc: calculationReducer,
});

export default allReducers;
