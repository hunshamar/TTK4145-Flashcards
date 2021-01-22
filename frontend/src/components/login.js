import React, {useState} from "react"
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



function Login() {

  const [token, setToken] = useState("")

  const login = () => {

    fetch("http://localhost:5000/api/logintoken")
    .then(response => response.json())
    .then(data => {
      console.log(token)

      setToken(data)
      window.open("https://www.itk.ntnu.no/api/feide.php?token="+token+"&returnURL=http://localhost:5000/api/userdata", "_self")


    })

    console.log("logging in")
  }


  if (token){
    return (
      <div>redirecting...</div>
    )
  } else {
  return (
    <div style={{margin: "300px"}}>
      <button onClick={login} style={{width: "300px", height: "100px"}}>
        Log in
      </button>
    </div>
  );
}
}

export default Login;
