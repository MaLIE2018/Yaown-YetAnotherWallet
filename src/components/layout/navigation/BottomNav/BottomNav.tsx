import { FC, ReactElement } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import useStyles from "./BottomNav.styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/types/types";
import bottomNavIcons from "../../../icons/bottomNav";
import { useDispatch } from "hooks/useDispatch";
import { t } from "i18n-js";

const BottomNav: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useSelector((state: IRootState) => state);
  const { Money, AccountBalanceIcon, ViewQuiltIcon, RemoveRedEyeIcon } =
    bottomNavIcons;
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
        label={t(`navigation.overview`)}
        value='overview'
        icon={<AccountBalanceIcon />}
      />
      <BottomNavigationAction
        label={t(`navigation.wealth`)}
        value='wealth'
        icon={<ViewQuiltIcon />}
      />
      <BottomNavigationAction
        label={t(`navigation.future`)}
        value='future'
        icon={<RemoveRedEyeIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
