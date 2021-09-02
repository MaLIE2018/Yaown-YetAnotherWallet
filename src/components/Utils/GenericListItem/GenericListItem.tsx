import React from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface Props {
  title: string;
  subTitle?: string;
  action: Function;
  logo: string;
}

const GenericListItem: React.FC<Props> = ({
  title,
  action,
  subTitle,
  logo,
}) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {logo ? <img src={logo} alt='' /> : <AccountBalanceIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={subTitle !== undefined ? subTitle : null}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='action' onClick={() => action()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GenericListItem;
