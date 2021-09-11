import React from "react";
import { List } from "@material-ui/core";
import GenericListItem from "components/Utils/GenericListItem/GenericListItem";
import { Api } from "../../../../api/index";
import { Account } from "types/bankAccount";

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
          <GenericListItem key={account._id} item={account} />
        ))}
    </List>
  );
};

export default AccountList;
