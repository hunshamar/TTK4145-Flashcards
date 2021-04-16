import { Button, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const UserDeckResult = ({ userdeck, handleEnd }) => {
  const calculatePercentage = (y, x) => {
    return Math.round((y * 100) / x);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "green" }}>
            Correct answers: {userdeck.correctAnswers}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "red" }}>
            wrong answers: {userdeck.wrongAnswers}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Result:{" "}
            <b>
              {calculatePercentage(
                userdeck.correctAnswers,
                userdeck.wrongAnswers + userdeck.correctAnswers
              )}
              %
            </b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleEnd}
            startIcon={<DeleteIcon />}
          >
            Delete this deck and return to study page
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDeckResult;
