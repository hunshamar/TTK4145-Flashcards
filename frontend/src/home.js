import React, {useEffect, useState}from "react"
import {useParams} from "react-router"
import axios from 'axios';


const Home = () => {

    // fetch("http://localhost:5000/api/login/callback",
    // { credentials: 'include' }).then(response => {
    //     return response.text()
    // }).then(data => {
    //     console.log(data)
    // })

    const [name, setName] = useState("")

    useEffect(async() => {
        fetch("http://localhost:5000/api/login/callback", {credentials: "include"})    
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("user_token", data);
        })    
        .then(stuff => {
            showUserInformation()
        })
    } ) 
    


    function showUserInformation()  {

        let auth =  localStorage.getItem('user_token');

        console.log("auth", auth)


        axios.get("http://localhost:5000/api/getcurrentuser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then(res => {
            console.log(res.data.name)
            console.log(res.data.email)
            console.log(res.data.username)
            setName(res.data.name)
        })


    }






  

    return(
        <div>
            <h1 style={{margin: "200px"}}>You are logged in, {name}</h1>
        </div>
    )
}

export default Home