import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../static/wrappers";
import { signInCallack } from "../store/actions/authActions";
import Loading from "./notifications/loading";

const LogInFunc = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  useEffect(() => {
    dispatch(signInCallack());
  }, [dispatch]);

  const history = useHistory();
  if (loggedIn) {
    history.push("/");
  }

  return (
    <PageWrapper>
      <Loading />
    </PageWrapper>
  );
};

export default LogInFunc;
