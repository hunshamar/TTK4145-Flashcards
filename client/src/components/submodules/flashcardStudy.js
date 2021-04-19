import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import StyledReactMarkdown from "./styledReactMarkdown";

const FlashcardStudy = ({
  flashcard,
  style,
  revealback,
  externalReveal = false,
}) => {
  useEffect(() => {
    console.log("rrr");
  }, revealback);

  const [reveal, setReveal] = useState(false);

  return (
    <div style={style}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{ minHeight: "100px", width: "100%", textAlign: "center" }}
        >
          <Typography variant="caption" color="textSecondary">
            Front:
          </Typography>
          <Typography
            variant="body2"
            style={{
              marginTop: "auto",
              overflow: "hidden",
            }}
          >
            <StyledReactMarkdown text={flashcard.front} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: "center", minHeight: "100px", width: "100%" }}
        >
          {revealback || reveal ? (
            <div>
              <Typography variant="caption" color="textSecondary">
                Back:
              </Typography>
              <Typography variant="body2">
                <StyledReactMarkdown text={flashcard.back} />
              </Typography>
            </div>
          ) : externalReveal ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "25px" }}
              onClick={() => setReveal(true)}
            >
              Show Answer
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default FlashcardStudy;
