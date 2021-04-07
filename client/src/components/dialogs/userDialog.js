import { Button, Dialog } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, removeAdmin } from "../../store/actions/userActions";
import { useEffect } from "react";
import userReducer from "../../store/reducers/userReducer";

const UserDialog = (props) => {
  const { onClose, selectedValue, open, user } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const makeAdmin = () => {
    dispatch(addAdmin(user));
    handleClose();
  };

  const unmakeAdmin = () => {
    dispatch(removeAdmin(user));
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div style={{ padding: "30px", width: "500px" }}>
        <h2>User: {user.name}</h2>
        <span style={{ color: "grey" }}>username: </span>
        <span>{user.username}</span> <br />
        <span style={{ color: "grey" }}>email: </span>
        <span>{user.email}</span> <br />
        <span style={{ color: "grey" }}>role: </span>
        <span>{user.role}</span> <br />
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          {user.role == "Admin" ? (
            <Button onClick={() => unmakeAdmin()} variant="outlined">
              Remove admin
            </Button>
          ) : (
            <Button onClick={() => makeAdmin()} variant="outlined">
              Make admin
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default UserDialog;
