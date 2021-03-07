
import { PageWrapper } from "../../static/wrappers";
import { Divider, Grid, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import GroupView from "../submodules/groupview";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loadCardgroups } from "../../store/actions/cardgroupActions";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({

}))

const PeerReview = () => {
    const classes = useStyles() 
    const dispatch = useDispatch();  
   
    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
    const isAdmin = useSelector(state => state.authReducer.isAdmin)

    useEffect(() => {
        dispatch(loadCardgroups())
    }, [dispatch])   

    const history = useHistory()

    const handleRedirect = groupId => {
        history.push("/peerreview/group/"+groupId)
    }

    return(
        <PageWrapper>

            <Grid container spacing={5}>  
                <Grid item xs={12}>
                    <Grid container spacing={2}>  
                        <Grid item xs={12}  >
                            <Typography variant="h4" gutterBottom >
                                Peer Review of Cards
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Todo:
                                <ul>
                                    <li>Admin "create" peer review. Choose cardgroup, duedate for peer review and number of 
                                        cards to review per student
                                    </li>
                                    <li>
                                        Styling of this page.. Duedate and progress on peer review
                                    </li>
                                    <li>
                                        Implement "mark as duplicated"
                                    </li>
                                    <li>
                                        Collect random cards for each student to rate. Now, every card appears
                                    </li>
                                </ul>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GroupView cardgroups={cardgroups} onClick={handleRedirect} />
                        </Grid> 

                    </Grid>
                </Grid>

            </Grid>

        </PageWrapper>
    )

}


export default PeerReview