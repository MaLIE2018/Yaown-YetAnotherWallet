import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import GenericModal from "components/Utils/GenericModal/GenericModal";

import { PieChart } from "../../components/layout/diagram/pie/PieChart";
import useStyles from "./Wealth.styles";
import useSelector from "hooks/useSelector";

import AccountList from "./Lists/Account/AccountList";
import { Button, List, ListItem } from "@material-ui/core";
import { useDispatch } from "hooks/useDispatch";

const Wealth = () => {
  const classes = useStyles();
  const { addAssetModal } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={classes.wealth}>
      <GeneralBox render={<PieChart />} />
      <GeneralBox render={<div>Assets</div>} title='Assets' />
      <GeneralBox render={<AccountList />} title='Accounts' />
      <GeneralBox render={<div>Insurances</div>} title='Insurances' />
      <GeneralBox render={<div>Debts</div>} title='Debts' />
      <GenericModal
        render={
          <div>
            <List>
              <ListItem>
                <Button color='primary' variant='contained'>
                  Asset
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    dispatch({ type: "TOGGLE_ADD_ASSET_MODAL" });
                    dispatch({ type: "TOGGLE_ADD_BANK_PAGE" });
                  }}>
                  Account
                </Button>
              </ListItem>
              <ListItem>
                <Button color='primary' variant='contained'>
                  Debts
                </Button>
              </ListItem>
              <ListItem>
                <Button color='primary' variant='contained'>
                  Insurance
                </Button>
              </ListItem>
            </List>
          </div>
        }
        show={addAssetModal}
        toggleModal={() => dispatch({ type: "TOGGLE_ADD_ASSET_MODAL" })}
      />
    </div>
  );
};

export default Wealth;
