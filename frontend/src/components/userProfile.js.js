import { Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";



const UserProfile  = () => {
    // const user = useSelector(state => state.authReducer.loggedInUser)
    // const dispatch = useDispatch();    
    const loggedInuser = useSelector(state => state.authReducer.loggedInUser)
    const dispatch = useDispatch();

    

    return(
        <div>
            <Typography variant="h3">User profile</Typography>
            {loggedInuser ? <div> <h2>You are logged in, {loggedInuser.name}</h2>
            <span style={{ color: "grey" }}>username: </span><span>{loggedInuser.username}</span> <br />
            <span style={{ color: "grey" }}>email: </span><span>{loggedInuser.email}</span> </div> : <h1> Not logged in  </h1>}

        </div>
    )
}


export default UserProfile