import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import categories from "assets/categories";
import React from "react";
import useStyles from "./ByCategoryList.style";

const ByCategoryList: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {categories.map((category) => (
        <ListItem>
          <ListItemIcon>
            <Button
              variant='contained'
              style={{ backgroundColor: category.color }}
              startIcon={<category.icon />}
              onClick={() => console.log()}>
              {category.name}
            </Button>
          </ListItemIcon>
          <ListItemText primary={`550$`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ByCategoryList;
