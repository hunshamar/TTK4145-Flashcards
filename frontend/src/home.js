import React from "react"
import {useParams} from "react-router"

const Home = () => {

    // fetch("http://localhost:5000/api/login/callback",
    // { credentials: 'include' }).then(response => {
    //     return response.text()
    // }).then(data => {
    //     console.log(data)
    // })

    fetch("http://localhost:5000/api/login/callback")

    
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

    let username = useParams().username
    console.log(username)

    return(
        <h1 style={{margin: "200px"}}>You are logged in, {username}</h1>
    )
}

export default Home