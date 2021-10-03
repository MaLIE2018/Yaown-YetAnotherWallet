import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import GenericModal from "components/Utils/GenericModal/GenericModal";
import { theme } from "theme/Theme";
import { PieChart } from "../../components/layout/diagram/pie/PieChart";
import useStyles from "./Wealth.styles";
import useSelector from "hooks/useSelector";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AccountList from "./Lists/Account/AccountList";
import { Box, Button, List, ListItem, Typography } from "@material-ui/core";
import { useDispatch } from "hooks/useDispatch";
import AssetList from "./Lists/Asset/AssetList";
import {
  getAssetSummary,
  getAccountSummary,
  getTotal,
} from "./../../utils/helpers/wealth";

import { currencyFormat } from "utils/helpers/text";
import GenericAlert from 'components/Utils/Alert/GenericALert';

const Wealth = () => {
  const classes = useStyles();
  const { assetModal, settings, wealthAlert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const assetSummary = getAssetSummary();
  const accountSummary = getAccountSummary();
  const total = getTotal(accountSummary, assetSummary);
  return (
    <div className={classes.wealth}>
      {settings.accounts.length !== 0 || settings.assets.length !== 0 ? (
        <>
          <Box
            width='90%'
            height='6%'
            display='flex'
            justifyContent='start'
            ml={"5%"}
            alignItems='end'>
            <Typography component='div' style={{ width: "100%" }}>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
                width='100%'>
                <Box fontWeight='fontWeightRegular'>Total wealth:</Box>
                <Box fontSize='h6.fontSize' fontWeight='fontWeightMedium'>
                  {`${currencyFormat(total, settings.lang, settings.currency)}`}
                </Box>
              </Box>
            </Typography>
          </Box>

          {accountSummary.total > 0 && (
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
          )}
          {settings.accounts.length !== 0 && (
            <GeneralBox render={<AccountList />} title='Accounts' />
          )}
          {settings.assets.length !== 0 && (
            <GeneralBox
              render={<AssetList assetSummary={assetSummary} />}
              title='Assets'
            />
          )}
        </>
      ) : (
        <Box
          height='60vh'
          width='100%'
          display='flex'
          alignItems='center'
          flexDirection='column'
          pt={theme.spacing(1)}>
          <Box>
            <InsertEmoticonIcon
              style={{ fontSize: 180, color: theme.palette.text.hint }}
            />
          </Box>
          <Typography component='div'>
            <Box fontSize='h6.fontSize' color={theme.palette.text.hint}>
              No accounts or assets yet.
            </Box>
          </Typography>
        </Box>
      )}
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
      <GenericAlert {...wealthAlert} />
    </div>
  );
};

export default Wealth;
