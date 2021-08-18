import { FC, ReactElement } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Money from "@material-ui/icons/Money";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import useStyles from "./BottomNav.styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/types/types";

const BottomNav: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useSelector((state: IRootState) => state);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    dispatch({ type: "SET_PAGE", payload: newValue });
  };

  return (
    <BottomNavigation
      value={page.present}
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

export default BottomNav;
