import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

const ConfirmationDialog = (props) => {
  const { open, onClose, onConfirm, title, description } = props;
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="cancel-popup"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          onClick={() => onClose()}
          className="btn pink-btn"
          style={{ backgroundColor: "#f14d54", color: "#FFFFFF" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
          }}
          autoFocus
          className="btn green-btn"
          style={{ backgroundColor: "#80BF32", color: "#FFFFFF" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
