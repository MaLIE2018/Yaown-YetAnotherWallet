import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import GenericModal from "components/Utils/GenericModal/GenericModal";

import { PieChart } from "../../components/layout/diagram/pie/PieChart";
import useStyles from "./Wealth.styles";
import useSelector from "hooks/useSelector";

import AccountList from "./Lists/Account/AccountList";
import { Box, Button, List, ListItem, Typography } from "@material-ui/core";
import { useDispatch } from "hooks/useDispatch";
import AssetList from "./Lists/Asset/AssetList";
import {
  getAssetSummary,
  getAccountSummary,
  getTotal,
} from "./../../utils/helpers/wealth";
import getCurrencySymbol from "currency-symbols";

const Wealth = () => {
  const classes = useStyles();
  const { assetModal } = useSelector((state) => state);
  console.log("assetModal:", assetModal);
  const dispatch = useDispatch();
  const assetSummary = getAssetSummary();
  const accountSummary = getAccountSummary();
  const total = getTotal(accountSummary, assetSummary);
  return (
    <div className={classes.wealth}>
      <Box
        width='90%'
        height='10%'
        display='flex'
        justifyContent='start'
        ml={"5%"}
        alignItems='end'>
        <Typography component='div' style={{ width: "100%" }}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            width='100%'>
            <Box fontWeight='fontWeightRegular'>Total wealth:</Box>
            <Box fontSize='h6.fontSize' fontWeight='fontWeightMedium'>
              {`${total} ${getCurrencySymbol("EUR")}`}
            </Box>
          </Box>
        </Typography>
      </Box>
      <GeneralBox
        render={
          <PieChart
            series={[
              assetSummary.assets.possessions,
              assetSummary.investments.total,
              Number(accountSummary.total.toFixed(2)),
              assetSummary.cash.total,
            ]}
            labels={["Assets", "Investments", "Accounts", "Cash"]}
          />
        }
      />
      <GeneralBox
        render={<AssetList assetSummary={assetSummary} />}
        title='Assets'
      />
      <GeneralBox render={<AccountList />} title='Accounts' />
      <GenericModal
        render={
          <div>
            <List>
              <ListItem>
                <Button fullWidth color='primary' variant='contained'>
                  Asset
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
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
                <Button fullWidth color='primary' variant='contained'>
                  Debts
                </Button>
              </ListItem>
              <ListItem>
                <Button fullWidth color='primary' variant='contained'>
                  Insurance
                </Button>
              </ListItem>
            </List>
          </div>
        }
        show={assetModal}
        toggleModal={() => dispatch({ type: "TOGGLE_ADD_ASSET_MODAL" })}
      />
    </div>
  );
};

export default Wealth;
