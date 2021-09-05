import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import useSelector from "hooks/useSelector";
import React from "react";
import { getCategory } from "utils/helpers/text";
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
        {category.name}
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
        <ListItem>
          <ListItemIcon>
            <CategoryButton categoryName={group._id} />
          </ListItemIcon>
          <ListItemText
            primary={`${group.total < 0 ? -group.total : group.total}$`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ByCategoryList;
