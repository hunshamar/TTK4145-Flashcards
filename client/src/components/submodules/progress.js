import {
  Grid,
  Typography,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progressBar: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: theme.palette.button.success.main,
    },
  },
}));

const Progress = ({ x, y, body, style }) => {
  const classes = useStyles();
  const percentage = Math.round(100 * (x / y));

  return (
    <div style={style}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="body1">{body}</Typography>
          <Typography variant="body1">
            {x} of {y}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4">{percentage}%</Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            className={classes.progressBar}
            variant="determinate"
            value={percentage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Progress;
