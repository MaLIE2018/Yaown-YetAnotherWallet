import { combineReducers } from "redux";
import navigationReducer from "./navigation";
import * as ns from "redux-undo";
import trackerReducer from "./showTracker";
import noteModalReducer from "./showNoteModal";
import settingsReducer from "./settings";
import categoryModalReducer from "./showCategoryModal";
import transactionReducer from "./transaction";
import calculationReducer from "./calculation";
import showTransactionAlertReducer from "./showTransactionAlert";
import addModalReducer from "./showAddModal";
import addBankReducer from "./showAddBankPape";
import showBankAlertReducer from "./showBankAlert";
import expenseReducer from "./Expense";
import showLoginAlertReducer from "./showLoginAlert";

const undoable = ns.default;

const allReducers = combineReducers({
  page: undoable(navigationReducer, {
    undoType: "NAVIGATION_BACK",
    redoType: "NAVIGATION_FORWARD",
  }),
  showTracker: trackerReducer,
  showNoteModal: noteModalReducer,
  showTransactionAlert: showTransactionAlertReducer,
  settings: settingsReducer,
  showCategoryModal: categoryModalReducer,
  transaction: transactionReducer,
  calc: calculationReducer,
  showAddModal: addModalReducer,
  showAddBankPage: addBankReducer,
  showBankAlert: showBankAlertReducer,
  showLoginAlert: showLoginAlertReducer,
  expense: expenseReducer,
});

export default allReducers;
