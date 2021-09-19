import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import getCurrencySymbol from "currency-symbols";
import { t } from "i18n-js";
import useSelector from "hooks/useSelector";
import React from "react";
import { currencyFormat, getCategory } from "utils/helpers/text";
import useStyles from "./ByCategoryList.style";

const CategoryButton: React.FC<{ categoryName: string }> = ({
  categoryName,
}) => {
  const category = getCategory(categoryName);
  if (category)
    return (
      <Button
        variant='contained'
        style={{ backgroundColor: category.color }}
        startIcon={<category.icon />}
        onClick={() => console.log()}>
        {t(`categories.${category.name}`)}
      </Button>
    );
  else return null;
};

const ByCategoryList: React.FC<{}> = () => {
  const { settings } = useSelector((state) => state);
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {settings.txnByCategory.map((group) => (
        <ListItem key={group._id}>
          <ListItemIcon>
            <CategoryButton categoryName={group._id} />
          </ListItemIcon>
          <ListItemText
            primary={`${
              group.total < 0
                ? currencyFormat(-group.total, settings.lang, settings.currency)
                : currencyFormat(group.total, settings.lang, settings.currency)
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ByCategoryList;
