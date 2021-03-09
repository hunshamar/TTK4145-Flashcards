import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInCallack } from '../store/actions/authActions';
import authReducer from "../store/reducers/authReducer";
import { useSelector } from 'react-redux';
import Loading from "./notifications/loading";
import {PageWrapper} from "../static/wrappers"


const LogInFunc = () => {
    const dispatch = useDispatch();    
    const loggedIn = useSelector(state => state.authReducer.loggedIn)

    useEffect(() => {
        dispatch(signInCallack())
    }, [dispatch])   

    const history = useHistory()
    if (loggedIn){
      history.push("/userprofile")
    }


    return( 
        <PageWrapper>
          <Loading /> 
        </PageWrapper>
      )


}

export default LogInFunc