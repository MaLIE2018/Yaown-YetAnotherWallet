import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface History {
  past: string[];
  present: string;
  future: string[];
  group: null | number;
  _latestUnfiltered: string;
  index: number;
  limit: number;
}

export enum Accounting {
  expense = "expense",
  income = "income",
}

export interface Settings {
  accessToken: string;
  refreshToken: string;
}

export enum AlertVariants {
  "error" = "error",
  "warning" = "warning",
  "info" = "info",
  "success" = "success",
}

export interface Transaction {
  note: string;
  date: Date;
  amount: string;
  account: string;
  time: string;
  category: string;
  type: Accounting;
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
}

export interface Bank {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
}
