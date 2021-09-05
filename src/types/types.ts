import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Account } from "./bankAccount";

export interface History {
  past: string[];
  present: string;
  future: string[];
  group: null | number;
  _latestUnfiltered: string;
  index: number;
  limit: number;
}

export interface User {
  _id?: string;
  name: string;
  img: string;
  email: string;
  accounts: [];
}

export interface Statement {
  _id: string;
  expenses: number;
  incomes: number;
}

export interface CategoryGroup {
  _id: string;
  total: number;
}

export interface Settings {
  accessToken: string;
  refreshToken: string;
  user: {};
  accounts: Account[];
  txnByCategory: CategoryGroup[];
  txnByDate: CategoryGroup[];
  statement: Statement[];
}

export enum AlertVariants {
  "error" = "error",
  "warning" = "warning",
  "info" = "info",
  "success" = "success",
}

export interface Category {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name: string;
  color: string;
}

export interface GenericAlert {
  text: string;
  variant: AlertVariants;
  show: boolean;
  type: string;
}

export interface GenericMenu {
  open: boolean;
  selected: string;
  range?: Date[];
}

export interface Bank {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
}
