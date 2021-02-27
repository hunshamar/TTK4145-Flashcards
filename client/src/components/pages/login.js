import React, { useState} from "react"
import  { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { Button, Link } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import { useDispatch  } from 'react-redux';
import { PageWrapper } from "../../static/wrappers";
import { SET_ALERT } from "../../store/actionTypes";


const StyledLink = styled(Link)({
  color: "black",
  padding: "20px"    
})

const ManualLogin = () => {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const [manualredirect, setManualredirect] = useState(false)


  const manualLogin = e =>{
    e.preventDefault()
    if (username && email && name){
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
        if (data.status === "success"){
          console.log("redirecting")
          setManualredirect(true)
        } else {
          throw(data.error) 
        }
      })
      .catch(err => {
        let alert = {severity: "error", text: err}
        dispatch({type: SET_ALERT, payload: alert}) 
  
      })
    } else {
      let alert = {severity: "error", text: "Missing credentials for login"}
      dispatch({type: SET_ALERT, payload: alert}) 
    }

  }

  if (manualredirect) {
    return( 
      <Redirect to={{
        pathname: "/loginfunc"
      }}/>  
    )
  }
  else {
    return(
      <div> 
          <div style={{marginBottom: 0, marginTop: "50px",}}> 
            <h3 style={{fontSize: "14px", color: "#666", display: "inline", padding: "12px"}}>ALTERNATIVE LOGIN - JUST FOR TESTING</h3> 
          </div>
          <form onSubmit={manualLogin}>
            <TextField  label="username" onChange={e => setUsername(e.target.value)} required />  <br />
            <TextField  label="name" onChange={e => setName(e.target.value)} required/> <br />
            <TextField  label="email" onChange={e => setEmail(e.target.value)} required/> <br />
            <Button  variant="contained"  style={{margin: "30px"}} type="submit">Manual Login (for testing)</Button>
          </form> 
        </div>
    )
  }
}

function Login() {

  const [AlternativeLogin, setAlternativeLogin] = useState(false)


  const dispatch = useDispatch()
  const feideLogin = () => {    
    axios.get("/api/logintoken", { withCredentials: true })
    .then(res => {
      window.open("https://www.itk.ntnu.no/api/feide.php?token="+res.data.token+"&returnURL=http://localhost:5000/api/userdata", "_self")
    })
    .catch(err => {
      console.log("err", err)
      let alert = {severity: "error", text: "External login failed"}
      dispatch({type: SET_ALERT, payload: alert}) 
    })
  } 



  
    return (
    <PageWrapper style={{textAlign: "center", marginTop: "15%"}}>

      <Button color="primary" variant="contained" onClick={feideLogin} style={{width: "300px", height: "80px"}}>
        Log in with Feide
      </Button> <br/>
      <div style={{padding: "10px"}}> 
        <StyledLink href="#" onClick={e => setAlternativeLogin(!AlternativeLogin)}>Alternative login</StyledLink>
        <StyledLink  target="_blank" href="https://s.ntnu.no/glemt" >Forgot Password</StyledLink>        
      </div>

      {AlternativeLogin ? 
        <ManualLogin />
      : <div> </div>}
    </PageWrapper>     
  );

}

export default Login;
