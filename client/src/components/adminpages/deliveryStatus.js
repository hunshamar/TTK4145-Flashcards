import { Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper } from "../../static/wrappers";
import { getUsersStatus } from "../../store/actions/userActions";
import { dateJSONToString } from "../../utils/datehandling";
import Loading from "../notifications/loading";
import CardgroupSelect from "../submodules/cardgroupselect";

const DeliveryStatus = () => {
  const dispatch = useDispatch();
  // const users = useSelector(state => state.userReducer.users)
  const status = useSelector((state) => state.userReducer.status);

  const [cardGroupId, setCardGroupId] = useState(0);
  const loading = useSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    dispatch(getUsersStatus(cardGroupId));
    console.log("status");
    console.log(status);
  }, [dispatch, cardGroupId]);

  console.log("usars");

  const columns = [
    { field: "username", headerName: "Username", width: 130 },
    { field: "delivered", headerName: "Delivered", type: "number", width: 130 },
    {
      field: "toDeliver",
      headerName: "To Deliver",
      type: "number",
      width: 130,
    },
    { field: "complete", headerName: "Complete", type: "number", width: 130 },
  ];

  let rows = status.map((s) => ({
    id: s.user.id,
    username: s.user.username,
    delivered: s.delivered,
    toDeliver: s.cardgroup.numberOfCardsDue,
    complete: s.delivered == s.cardgroup.numberOfCardsDue ? true : false,
  }));

  console.log("cgid", cardGroupId);

  return (
    <PageWrapper>
      <div style={{ marginBottom: "15px" }}>
        <CardgroupSelect onChange={setCardGroupId} showFirst />
      </div>

      {loading ? (
        <Loading />
      ) : status.length ? (
        <div>
          <Typography variant="subtitle2" style={{ marginTop: "20px" }}>
            {status[0]
              ? "Due: " + dateJSONToString(status[0].cardgroup.dueDate)
              : "Due:"}
          </Typography>

          <div style={{ height: "400px", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              autoHeight
              rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      ) : (
        "No status found"
      )}

      {/* {loading ? <Loading /> : 

            status.length ? 
            <div>
                <Typography variant="subtitle2" style={{marginTop: "20px"}}>
                    {status[0] ? "Due: " + dateJSONToString(status[0].cardgroup.dueDate) : "Due:"}
                </Typography>
        
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5}  />
                </div>
            </div>
            : 
            ""} */}
    </PageWrapper>
  );
};

export default DeliveryStatus;
