export interface History {
  past: string[];
  present: string;
  future: string[];
  group: null | number;
  _latestUnfiltered: string;
  index: number;
  limit: number;
}

export interface Settings {
  accessToken: string;
}

export interface Transaction {
  note: string;
  date: Date;
  amount: number;
  account: string;
  time: string;
  category: string;
}
