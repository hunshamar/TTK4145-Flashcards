import React, {useImperativeHandle, useState} from "react"
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";
import { Button, Link, IconButton } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Loading from "./submodules/loading";
import authReducer from '../store/reducers/authReducer';
import { useSelector } from 'react-redux';



function Login() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [AlternativeLogin, setAlternativeLogin] = useState(false)
  const [manualredirect, setManualredirect] = useState(false)
  const [token, setToken] = useState("")

    

  const feideLogin = () => {

    
    fetch("/api/logintoken", { credentials: "include" })
    .then(response => response.json())
    .then(data => {
      console.log(token)
      setToken(data)
      window.open("https://www.itk.ntnu.no/api/feide.php?token="+token+"&returnURL=http://localhost:5000/api/userdata", "_self")
    })
    .catch(err => {
      console.log("err", err)
    })

    console.log("logging in")
  }

  const StyledLink = styled(Link)({
    color: "black",
    padding: "20px"    
  })

   const loading = useSelector(state => state.authReducer.loading)



  

  const manualLogin = e =>{
    e.preventDefault()
    if (username, email, name){

      let data = {
        username: username,
        email: email,
        name: name
      }      

      var url = '/api/userdata';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',   // this line has been added for sessions 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success"){
          console.log("redirecting")
          setManualredirect(true)
        } else {
          alert(data.status)
        }
      })
    } else {
      console.log("missing credentials for login", username, email, name)
    }

  }

  if (manualredirect) {
    return( 
      <Redirect to={{
        pathname: "/loginfunc"
      }}/>  
    )
  }
  else if (token){
    return (
      <div>redirecting...</div>
    )
  } else {

  const openManualLogin = () => {
    console.log("do that shit")
    setAlternativeLogin(true)
  }

  if (loading){
    return(
      <Loading />
    )
  }

  return (

    <div style={{marginTop: "250px", textAlign: "center"}}>

      <Button color="primary" variant="contained" onClick={feideLogin} style={{width: "300px", height: "80px"}}>
        Log in with Feide
      </Button> <br/>
      <div style={{padding: "10px"}}> 
        <StyledLink href="#" onClick={e => setAlternativeLogin(!AlternativeLogin)}>Alternative login</StyledLink>
        <StyledLink  target="_blank" href="https://s.ntnu.no/glemt" >Forgot Password</StyledLink>        
      </div>

      {AlternativeLogin ? 
      <div> 
        <div style={{marginBottom: 0, marginTop: "50px",}}> 
          <h3 style={{fontSize: "14px", color: "#666", display: "inline", padding: "12px"}}>ALTERNATIVE LOGIN - JUST FOR TESTING</h3> 
        </div>
      <form onSubmit={manualLogin}>
         <TextField fullwidth label="username" onChange={e => setUsername(e.target.value)} required />  <br />
         <TextField fullwidth label="name" onChange={e => setName(e.target.value)} required/> <br />
         <TextField fullwidth label="email" onChange={e => setEmail(e.target.value)} required/> <br />
         <Button fullwidth variant="contained" color="seconday" style={{margin: "30px"}} type="submit">Manual Login (for testing)</Button>
      </form> 
      </div>
      : <div> </div>}
      </div>

    
  );
}
}

export default Login;
