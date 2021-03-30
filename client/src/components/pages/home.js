
import { Grid, Typography, Divider, Link, Button } from '@material-ui/core';


import { PageWrapper } from '../../static/wrappers';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link as ReactLink } from 'react-router-dom';
import Feedback from '../dialogs/feedback';
import { useState } from 'react';


const Home = () => {

    const [openFeedback, setOpenFeedback] = useState(false)

    return(
        <PageWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12}  >
                    <Typography variant="h4" gutterBottom >
                        Home
                    </Typography>
                </Grid> 
                <Grid item xs={12}>
                    <Divider />
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        <b>About:</b> <br/>
                        This application will be used to build a collective deck of quality flashcards, covering the curriculum of TTK4145 - Real-time Programming.
                        <br /> <br />
                        During the semester you are tasked with creating 2-5 flashcards for specific parts of the course material. Through peer review, the best flashcards will be selected to be added to the collective deck. 
                        You will be rewarded for creating original, quality flashcards. 
                        <br /> <br/> 
                        Keep flashcards simple. Flashcards can be written as pure text or with HTML syntax. If you are new to HTML, <ReactLink to="/htmlguide" color="primary"> <Link color="textPrimary">check out this basic guide </Link></ReactLink>
                        <br /> <br/>                                                                                                
                        <span>You will be able to use the collective deck to study the course material, either a random sample or through spaced repetition, which is recommended. </span>
                         <Link color="textPrimary" href="https://en.wikipedia.org/wiki/Spaced_repetition">Read more about spaced repetition here</Link>  
                        <br/> <br />
                        Please submit feedback, suggestions or report bugs with the button below

                        <div style={{margin: "40px 50px 0px"}}>
                        <Feedback />
                        </div>
                                               
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop: "50px"}}>
                    <Typography variant="body2" color="textSecondary">
                                <b>Contact:</b>                                                           
                    </Typography>                                       
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                        <b>Asgeir Hunshamar</b> <br/>
                        Creator and developer <br/>
                        <a>asgeirhu@stud.ntnu.no</a>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                        <b>Sverre Hendseth</b> <br/>
                        Course coordinator and lecturer <br/>
                        <Link color="inherit" href="mailto:sverre.hendseth@ntnu.no">sverre.hendseth@ntnu.no</Link> 
                    </Typography>
                </Grid>

            </Grid>


        </PageWrapper>
    )
}

export default Home