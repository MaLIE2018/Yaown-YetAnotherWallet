import React, { ReactElement } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

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
      onClose={() => toggleModal()}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <div>{render}</div>
    </Modal>
  );
};

export default GenericModal;
