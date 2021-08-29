export interface Account {
  resourceId: string;
  _id: string;
  iban: string;
  currency: string;
  ownerName: string;
  userId: string;
  name: string;
  product: string;
  cashAccountType: string;
  balances: Balances[];
  transactions: { booked: Booked[]; pending: Pending[] };
}

export interface Balances {
  balanceAmount: BalanceAmount;
  balanceType: string;
  referenceDate: string;
}

export interface BalanceAmount {
  amount: number;
  currency: string;
}

export interface Transaction {
  booked: any[];
  pending: any[];
}

export interface Booked {
  transactionId: string;
  debtorName?: string;
  debtorAccount?: DebtorAccount;
  transactionAmount: TransactionAmount;
  bankTransactionCode: string;
  bookingDate: string;
  valueDate: string;
  remittanceInformationUnstructured: string;
  category: string;
}

export interface DebtorAccount {
  iban: string;
}

export interface TransactionAmount {
  currency: string;
  amount: number;
}

export interface Pending {
  transactionAmount: TransactionAmount;
  valueDate: Date;
  remittanceInformationUnstructured: string;
  category: string;
}
