import {
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));

BlogPostDelete.propTypes = {
  handleClose: PropTypes.func,
  onAgree: PropTypes.func,
  open: PropTypes.bool,
};

export default function BlogPostDelete({ open, handleClose, onAgree }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Are you sure do you want to delete this post?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone, are you sure you want to delete post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ColorButton
          variant="contained"
          onClick={() => {
            handleClose();
            onAgree();
          }}
          autoFocus
        >
          Yes
        </ColorButton>
        <ColorButton variant="contained" onClick={handleClose}>
          No
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}
