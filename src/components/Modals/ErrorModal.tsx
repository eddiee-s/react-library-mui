import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ErrorModalPropTypes {
  isOpen?: boolean;
  message: string;
  handleConfirm?: () => void;
}

const ErrorModal: React.FC<ErrorModalPropTypes> = ({
  isOpen = true,
  message,
  handleConfirm,
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`New Book add status`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;
