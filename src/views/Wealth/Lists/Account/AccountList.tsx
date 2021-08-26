import React from "react";
import { List } from "@material-ui/core";
import GenericListItem from "components/Utils/GenericListItem/GenericListItem";

const Accounts = [
  { id: "1", bank: "Deutsche Bank", saldo: "5400 $", name: "MyAccount1" },
  { id: "2", bank: "Comdirect", saldo: "3400 $", name: "MyAccount2" },
];
const AccountList: React.FC<{}> = () => {
  return (
    <List>
      {Accounts.map((account) => (
        <GenericListItem
          key={account.id}
          title={account.bank}
          subTitle={`${account.name} ${account.saldo}`}
          action={() => console.log(account)}
        />
      ))}
    </List>
  );
};

export default AccountList;
