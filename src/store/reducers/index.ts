import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";
import trackerReducer from "./showTracker";
import noteModalReducer from "./modal/noteModal";
import settingsReducer from "./settings";
import categoryModalReducer from "./modal/categoryModal";
import transactionReducer from "./transaction";
import calculationReducer from "./calculation";
import transactionAlertReducer from "./alert/transactionAlert";
import assetModalReducer from "./modal/addAssetModal";
import bankPageReducer from "./page/bankPape";
import bankAlertReducer from "./alert/bankAlert";
import expenseReducer from "./Expense";
import loginAlertReducer from "./alert/loginAlert";
import accountMenuReducer from "./menu/accountMenu";
import timeMenuReducer from "./menu/timeMenu";
import { addAssetReducer } from "./page/assetPage";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
  showTracker: trackerReducer,
  noteModal: noteModalReducer,
  transactionAlert: transactionAlertReducer,
  settings: settingsReducer,
  categoryModal: categoryModalReducer,
  transaction: transactionReducer,
  calc: calculationReducer,
  addAssetModal: assetModalReducer,
  bankPage: bankPageReducer,
  bankAlert: bankAlertReducer,
  loginAlert: loginAlertReducer,
  expense: expenseReducer,
  accountMenu: accountMenuReducer,
  timeMenu: timeMenuReducer,
  assetPage: addAssetReducer,
});

export default allReducers;
