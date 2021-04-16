import { Divider, Grid, Link, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { PageWrapper } from "../../static/wrappers";
import Feedback from "../dialogs/feedback";

const Home = () => {
  return (
    <PageWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Home
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            <b>About:</b> <br />
            This application will be used to build a collective deck of quality
            flashcards, covering the curriculum of TTK4145 - Real-time
            Programming.
            <br /> <br />
            During the semester you are tasked with creating 2-5 flashcards for
            specific parts of the course material. Through peer review, the best
            flashcards will be selected to be added to the collective deck. You
            will be rewarded for creating original, quality flashcards.
            <br /> <br />
            Keep flashcards simple. Flashcards can be written using markdown.
            <p>
              You will be able to use the collective deck to study the course
              material, either a random sample or in the future through
              <Link
                color="textPrimary"
                href="https://en.wikipedia.org/wiki/Spaced_repetition"
              >
                spaced repetition
              </Link>
            </p>
            <br />
            Please submit feedback, suggestions or report bugs with the button
            below
            <div style={{ margin: "40px 50px 0px" }}>
              <Feedback />
            </div>
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Typography variant="body2" color="textSecondary">
            <b>Contact:</b>
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="textSecondary">
            <Link color="inherit" href="mailto:asgeirhu@stud.ntnu.no">
              <b>Asgeir Hunshamar</b> <br />
              Creator and developer <br />
              asgeirhu@stud.ntnu.no
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="textSecondary">
            <b>Sverre Hendseth</b> <br />
            Course coordinator and lecturer <br />
            <Link color="inherit" href="mailto:sverre.hendseth@ntnu.no">
              sverre.hendseth@ntnu.no
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
