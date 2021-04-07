import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { PageWrapper } from "../../static/wrappers";

const UserProfile = () => {
  const loggedInuser = useSelector((state) => state.authReducer.loggedInUser);
  const isAdmin = useSelector((state) => state.authReducer.isAdmin);
  // const dispatch = useDispatch();

  return (
    <PageWrapper>
      {isAdmin ? (
        <Typography variant="h3">Admin profile</Typography>
      ) : (
        <Typography variant="h3">User profile</Typography>
      )}
      {loggedInuser ? (
        <div>
          {" "}
          <h2>You are logged in, {loggedInuser.name}</h2>
          <span style={{ color: "grey" }}>username: </span>
          <span>{loggedInuser.username}</span> <br />
          <span style={{ color: "grey" }}>email: </span>
          <span>{loggedInuser.email}</span>{" "}
        </div>
      ) : (
        <h1> Not logged in </h1>
      )}
    </PageWrapper>
  );
};

export default UserProfile;
