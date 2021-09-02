import React from "react";
import { List } from "@material-ui/core";
import GenericListItem from "components/Utils/GenericListItem/GenericListItem";
import { Api } from "../../../../api/index";
import { Account } from "types/bankAccount";

const Accounts = [
  { id: "1", bank: "Deutsche Bank", saldo: "5400 $", name: "MyAccount1" },
  { id: "2", bank: "Comdirect", saldo: "3400 $", name: "MyAccount2" },
];
const AccountList: React.FC<{}> = () => {
  const [accounts, setAccounts] = React.useState<Account[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    (async () => {
      const accounts = await Api.getSingleton().getMyAccounts();
      if (accounts.length !== 0) {
        setAccounts(accounts);
      }
    })();
  }, []);

  return (
    <List>
      {accounts &&
        accounts.map((account: Account) => (
          <GenericListItem
            key={account._id}
            title={account.bankName}
            subTitle={`${
              account?.name
            } ${account.balances[0].balanceAmount.amount.toFixed(2)} ${
              account.balances[0].balanceAmount.currency
            }`}
            logo={account.logo}
            action={() => console.log(account)}
          />
        ))}
    </List>
  );
};

export default AccountList;
