import { useHistory } from "react-router-dom";

const AdminPage = () => {
  const history = useHistory();
  history.push("/adminpage/users");
  return <div>redirect...</div>;
};

export default AdminPage;
