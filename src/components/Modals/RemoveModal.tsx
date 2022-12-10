import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { bookDataTypes } from "../../types";

interface RemoveModalPropTypes {
  isOpen?: boolean;
  bookData: bookDataTypes;
  handleClose: () => void;
  handleRemove: () => void;
}

const RemoveModal: React.FC<RemoveModalPropTypes> = ({
  isOpen = false,
  bookData,
  handleClose,
  handleRemove,
}) => {
  const handleConfirm = () => {
    handleClose();
    handleRemove();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Remove Book ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selected book:{" "}
            <span style={{ fontWeight: "bold" }}>{bookData.title}</span> <br />
            Are you sure you want to delete selected book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveModal;
