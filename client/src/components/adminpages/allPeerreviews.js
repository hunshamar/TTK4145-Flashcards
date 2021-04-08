import { PageWrapper } from "../../static/wrappers";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { getUsersStatus } from "../../store/actions/userActions";
import { DataGrid } from "@material-ui/data-grid";
import CardgroupSelect from "../submodules/cardgroupselect";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { getCardgroupPeerreviews } from "../../store/actions/peerreviewActions";
import { dateJSONToString } from "../../utils/datehandling";
import RateCard from "../submodules/rateCard";
import Loading from "../notifications/loading";

const AllPeerreviews = () => {
  const dispatch = useDispatch();
  // const users = useSelector(state => state.userReducer.users)
  const peerreviews = useSelector(
    (state) => state.peerreviewReducer.peerreviews
  );  

  const [cardGroupId, setCardGroupId] = useState(0);

  const loading = useSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    dispatch(getCardgroupPeerreviews(cardGroupId));
  }, [dispatch, cardGroupId]);

  console.log("peerreviews", peerreviews);

  const columns = [
    { field: "username", headerName: "Username", width: 130 },
    {
      field: "toRate",
      headerName: "To Rate",
      type: "number",
      width: 130,
    },
    { field: "rated", headerName: "Rated", type: "number", width: 130 },
    { field: "complete", headerName: "Complete", type: "number", width: 130 },
  ];

  let rows = peerreviews.map((s) => ({
    id: s.user.id,
    username: s.user.username,
    toRate: s.reviewsDue,
    rated: s.reviewsDone,
    complete: s.reviewsDue == s.reviewsDone ? true : false,
  }));

  console.log("cgid", cardGroupId);
  return (
    <PageWrapper>
      <div style={{ marginBottom: "15px" }}>
        <CardgroupSelect onChange={setCardGroupId} showFirst />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div>
          {peerreviews.length ? (
            <div>
              <Typography variant="subtitle2" style={{ marginTop: "20px" }}>
                {peerreviews[0]
                  ? "Due: " + dateJSONToString(peerreviews[0].dueDate)
                  : "Due:"}
              </Typography>

              <div style={{ height: 400, width: "100%" }}>
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
            "No Peerreviews for this cardgroup found"
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default AllPeerreviews;
