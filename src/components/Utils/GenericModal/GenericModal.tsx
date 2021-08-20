import React, { ReactElement } from "react";
import Modal from "@material-ui/core/Modal";

import useStyles from "./GenericModal.style";

interface Props {
  render: ReactElement;
  show: boolean;
  toggleModal: Function;
}

const GenericModal: React.FC<Props> = ({
  render,
  show,
  toggleModal,
}: Props) => {
  const classes = useStyles();
  return (
    <Modal
      open={show}
      onClose={() => toggleModal(false)}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div className={classes.paper}>{render}</div>
    </Modal>
  );
};

export default GenericModal;
