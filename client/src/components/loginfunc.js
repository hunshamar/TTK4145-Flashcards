import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signInCallack } from '../store/actions/authActions';




const LogInFunc = () => {

    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(signInCallack())
        console.log("is logged", loggedIn)
    }, [])   




    return( 
        <Redirect to={{
          pathname: "/"
        }}/>  
      )


}

export default LogInFunc