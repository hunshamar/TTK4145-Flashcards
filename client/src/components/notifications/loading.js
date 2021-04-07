import { CircularProgress, makeStyles } from "@material-ui/core/";
import { useSelector } from "react-redux";
import loadingReducer from "../../store/reducers/loadingReducer";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));

const Loading = (props) => {
  const classes = useStyles();
  const loading = useSelector((state) => state.loadingReducer.loading);

  return (
    <div style={props.style} className={classes.loader}>
      {loading ? (
        <CircularProgress
          size={props.size ? props.size : 40}
          color={props.color ? props.color : "secondary"}
        />
      ) : props.alternative ? (
        props.alternative
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Loading;
