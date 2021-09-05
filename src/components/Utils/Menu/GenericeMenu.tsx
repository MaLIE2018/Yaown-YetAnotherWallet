import { Menu, MenuItem } from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  handleClose: Function;
  items: any[];
  anchorEl: HTMLElement | null;
  handleChange: Function;
}

const GenericMenu: React.FC<Props> = ({
  anchorEl,
  open,
  handleClose,
  items,
  handleChange,
}) => {
  return (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={() => handleClose()}>
      {items.map((item, i) => (
        <MenuItem
          key={i}
          onClick={(event) => {
            handleClose();
            handleChange(event.currentTarget.textContent);
          }}>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
export default GenericMenu;
