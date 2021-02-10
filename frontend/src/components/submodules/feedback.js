import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    feedback: {
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100vh-30px",
        display: "flex",
        overflow: "hidden"
    },
    button: {
        // justifyContent: "flex-end",
        // display: "flex",
        width: "200px",
        height: "50px",
        marginRight: "20px",
        marginLeft: "auto",
        // marginTop: "auto"
        top: "auto",
        bottom: 0,
        whiteSpace: "nowrap"
        
    }
}))


const Feedback = () => {
    const classes = useStyles()
    



    return(
        <div className={classes.feedback}>
            <Button className={classes.button} variant="contained">Gi Feedback</Button>
        </div>
    )
}

export default Feedback