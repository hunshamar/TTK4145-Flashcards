import React, {useImperativeHandle, useState} from "react"
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";



function Login() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [manualredirect, setManualredirect] = useState(false)
  const [token, setToken] = useState("")

  const feideLogin = () => {

    fetch("http://localhost:5000/api/logintoken")
    .then(response => response.json())
    .then(data => {
      console.log(token)

      setToken(data)
      window.open("https://www.itk.ntnu.no/api/feide.php?token="+token+"&returnURL=http://localhost:5000/api/userdata", "_self")


    })

    console.log("logging in")
  }


  

  const manualLogin = e =>{
    e.preventDefault()
    if (username, email, name){

      // const headers = {
      //   "Access-Control-Allow-Origin": "http://localhost:3000"
      // };

      let data = {
        username: username,
        email: email,
        name: name
      }
      
      // const res = Axios.post("http://localhost:5000/api/userdata", data, {widthCredentials: true})
      // console.log("e")


      var url = 'http://localhost:5000/api/userdata';
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


    //   fetch('http://localhost:5000/api/manuallogin', {
    //   method: 'POST', // or 'PUT'
    //   mode: "cors", 
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });


    } else {
      console.log("missing credentials for login", username, email, name)
    }

  }

  if (manualredirect) {
    return( 
      <Redirect to={{
        pathname: "/home"
      }}/>  
    )
  }
  else if (token){
    return (
      <div>redirecting...</div>
    )
  } else {
  return (
    <Grid container spacing={2} style={{margin: "20%"}}>
      <Grid item xs={6} >
      <button onClick={feideLogin} style={{width: "300px", height: "80px"}}>
        Log in with Feide
      </button>
      </Grid>
      <Grid item xs={6} >


      <form onSubmit={manualLogin} style={{marginTop: "30px", border: '2px solid black', padding: "50px", textAlign: "center", width: "400px"}}>
         <TextField label="username" onChange={e => setUsername(e.target.value)} required />
         <TextField label="name" onChange={e => setName(e.target.value)} required/>
         <TextField label="email" onChange={e => setEmail(e.target.value)} required/>
        <input type="submit" value="manual login (for testing)" style={{width: "300px", height: "40px", marginTop: "10px"}}/>
      </form>

      </Grid>
      </Grid>

    
  );
}
}

export default Login;
