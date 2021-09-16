import React from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Box,
} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useStyles from "./GenericListItem.style";
import { Account, Asset } from "types/bankAccount";
import getCurrencySymbol from "currency-symbols";

import { currencyFormat, getAsset } from "utils/helpers/text";
import { AssetType } from "types/types";
import useSelector from "hooks/useSelector";

interface Props {
  item: Account | Asset;
}

function isAccount(item: Account | Asset): item is Account {
  return (item as Account).bankName !== undefined;
}

const GenericListItem: React.FC<Props> = ({ item }) => {
  const { settings } = useSelector((state) => state);
  const classes = useStyles();
  let title, subTitle, logo: string;
  let debtValue, value: number;
  let assetType: AssetType | undefined;
  debtValue = 0;
  if (isAccount(item)) {
    title = item.bankName;
    subTitle = item.name;
    logo = item.logo;
    value = item.balances[0].balanceAmount.amount;
  } else {
    if (item.name !== "") {
      title = item.name;
    } else {
      title = item.type;
    }
    value = item.value;

    logo = "";
    assetType = getAsset(item.type);
    if (item.residualDebt !== 0) {
      subTitle = "Financing";
      debtValue = item.residualDebt;
    }
  }

  return (
    <ListItem className={classes.genericListItem}>
      <ListItemAvatar>
        <Avatar>
          {logo ? (
            <img src={logo} alt='' height='40px' width='40px' />
          ) : assetType ? (
            <assetType.icon />
          ) : (
            <AccountBalanceIcon />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={subTitle !== undefined ? subTitle : null}
      />
      <Box position='absolute' right={"12%"} top={"21%"}>
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='column'
          alignItems='center'>
          <div className='MuiTypography-body1'>
            {`${currencyFormat(value, settings.lang, settings.currency)}`}
          </div>
          {debtValue !== 0 ? (
            <div
              className='MuiListItemText-secondary MuiTypography-colorTextSecondary'
              style={{ alignSelf: "end" }}>
              {`${currencyFormat(
                -debtValue,
                settings.lang,
                settings.currency
              )}`}
            </div>
          ) : undefined}
        </Box>
      </Box>

      <ListItemSecondaryAction>
        <IconButton
          className={classes.iconButton}
          edge='end'
          aria-label='action'
          onClick={() => console.log()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GenericListItem;
