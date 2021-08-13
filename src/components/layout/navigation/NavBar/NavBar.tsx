import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Money from "@material-ui/icons/Money";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { useState, FC, ReactElement } from "react";
import useStyles from "./NavBar.styles";

const NavBar: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("cash");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}>
      <BottomNavigationAction label='Cash' value='cash' icon={<Money />} />
      <BottomNavigationAction
        label='Overview'
        value='overview'
        icon={<AccountBalanceIcon />}
      />
      <BottomNavigationAction
        label='Wealth'
        value='wealth'
        icon={<ViewQuiltIcon />}
      />
      <BottomNavigationAction
        label='Future'
        value='future'
        icon={<RemoveRedEyeIcon />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
