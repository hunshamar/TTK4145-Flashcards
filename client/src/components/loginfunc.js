import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInCallack } from '../store/actions/authActions';

const LogInFunc = () => {
    const dispatch = useDispatch();   
    
    useEffect(() => {
        dispatch(signInCallack())
    }, [dispatch])   

    return( 
        <Redirect to={{
          pathname: "/"
        }}/>  
      )


}

export default LogInFunc