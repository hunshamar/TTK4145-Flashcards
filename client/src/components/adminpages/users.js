import { PageWrapper } from "../../static/wrappers";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "../../store/reducers/userReducer";
import { useEffect } from "react";
import {
  getAllUsers,
  getUsersWithRole,
  searchUsers,
} from "../../store/actions/userActions";
import { DataGrid } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";
import {
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useState } from "react";
import UserDialog from "../dialogs/userDialog";

const Users = (props) => {
  const [show, setShow] = useState("all");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [searchPhrase, setSearchPhrase] = useState("");

  const userRoleFiler = (role) => {
    if (role === "all") {
      console.log("all da");
      dispatch(getAllUsers());
    } else if (role === "User") {
      dispatch(getUsersWithRole("User"));
    } else if (role === "Admin") {
      console.log("aadd");
      dispatch(getUsersWithRole("Admin"));
    }
  };

  useEffect(() => {
    // dispatch(getAllUsers())
    userRoleFiler(show);
  }, [dispatch, show]);

  let rows = users;

  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "username", headerName: "username", width: 130 },
    { field: "name", headerName: "name", width: 130 },
    { field: "email", headerName: "email", width: 130 },
    { field: "role", headerName: "role", width: 130 },
  ];

  const handleSearch = (e) => {
    if (!searchPhrase) {
      userRoleFiler(show);
    } else {
      dispatch(searchUsers(show, searchPhrase));
    }
  };

  const handleFilter = (e) => {
    setSearchPhrase("");
    setShow(e.target.value);
  };

  const handleClick = (e) => {
    console.log("print", e.row);
    setSelectedUser(e.row);
    setOpenUserDialog(true);
  };

  return (
    <PageWrapper>
      <UserDialog
        open={openUserDialog}
        onClose={() => setOpenUserDialog(false)}
        user={selectedUser}
      />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              // value={show}
              // onChange={e => setShow(e.target.value)}'
              required
              color="secondary"
              value={show}
              onChange={(e) => handleFilter(e)}
              label="show"
            >
              <MenuItem value={"all"}>All users</MenuItem>
              <MenuItem value={"Admin"}>Admins</MenuItem>
              <MenuItem value={"User"}>Users</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="search"
            label="Search username"
            color="secondary"
            defaultValue=""
            fullWidth
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setSearchPhrase(e.target.value)}
            value={searchPhrase}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              onCellClick={(e) => handleClick(e)}
              rows={rows}
              columns={columns}
              pageSize={5}
              autoHeight
              rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
            />
          </div>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Users;
