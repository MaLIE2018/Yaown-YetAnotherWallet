import { store } from "store/store";
import { Asset, Account } from "types/bankAccount";
import { typeNames } from "types/types";

export interface AssetSummary {
  assets: {
    debts: number;
    possessions: number;
  };
  investments: {
    total: number;
  };
  cash: {
    total: number;
  };
}

interface AccountSummary {
  total: number;
}

export const getTotal = (
  accountSummary: AccountSummary,
  assetSummary: AssetSummary
): number => {
  let total = 0;
  total =
    assetSummary.assets.possessions +
    assetSummary.assets.debts +
    assetSummary.cash.total +
    accountSummary.total +
    assetSummary.investments.total;

  return total;
};

export const getAssetSummary = (): AssetSummary => {
  const assets = store.getState().settings.assets;
  let summary: AssetSummary = {
    assets: { debts: 0, possessions: 0 },
    investments: { total: 0 },
    cash: { total: 0 },
  };
  if (assets.length !== 0) {
    summary = assets.reduce(
      (acc: AssetSummary, ass: Asset) => {
        if (ass.type === typeNames.depot) {
          acc.investments.total += ass.value;
        } else if (ass.type === typeNames.cash) {
          acc.cash.total += ass.value;
        } else {
          acc.assets.debts = acc.assets.debts + ass.residualDebt;
          acc.assets.possessions = acc.assets.possessions + ass.value;
        }
        return acc;
      },
      {
        assets: { debts: 0, possessions: 0 },
        investments: { total: 0 },
        cash: { total: 0 },
      }
    );
  }
  if (store.getState().settings.accounts[0]?.balances[0].balanceAmount.amount)
    summary.cash.total +=
      store.getState().settings.accounts[0].balances[0].balanceAmount.amount;
  return summary;
};

export const getAccountSummary = (): AccountSummary => {
  const assets = store.getState().settings.accounts;
  let summary: AccountSummary = { total: 0 };
  if (assets.length !== 0) {
    summary = assets.reduce(
      (acc: AccountSummary, ass: Account) => {
        if (ass.name !== "Cash")
          acc.total =
            acc.total + Number(ass.balances[0].balanceAmount.amount.toFixed(2));
        return acc;
      },
      { total: 0 }
    );
  }
  return summary;
};
