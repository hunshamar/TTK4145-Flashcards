import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from 'axios';
import { Redirect } from "react-router-dom"
import authReducer from '../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { signInCallack } from '../store/actions/authActions';


const Home = () => {

    // fetch("http://localhost:5000/api/login/callback",
    // { credentials: 'include' }).then(response => {
    //     return response.text()
    // }).then(data => {
    //     console.log(data)
    // })



    const [userInfo, setUserInfo] = useState({})
    const [numberOfCards, setNumberOfCards] = useState(3)
    const [redirectToNewPage, setredirectToNewPage] = useState(false)


    // useEffect(async () => {

    //     axios.get("http://localhost:5000/api/login/callback", { withCredentials: true })
    //     .then(response => {
    //         let user_token = response.data
    //         localStorage.setItem("user_token", user_token)
    //         showUserInformation()
    //     })
    // }, [])

    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const dispatch = useDispatch();


    useEffect(() => {
        if (loggedIn){
            showUserInformation()
        } else {
            console.log("not here")
        }
    }, [loggedIn])   


    const submitCardForm = e => {
        e.preventDefault()
        console.log("cards", numberOfCards)

        setredirectToNewPage(true)

    }

    function showUserInformation() {
        console.log("hø")
        console.log("igjen")

        let auth = localStorage.getItem('user_token');
        
        if(!auth){
            setUserInfo({})
        }
        else{
            console.log("authmama", auth)


            axios.get("http://localhost:5000/api/getcurrentuser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                }
            }).then(res => {
                console.log(res.data.name)
                console.log(res.data.email)
                console.log(res.data.username)
                setUserInfo(res.data)
            })
        }


    }

    if (redirectToNewPage) {
        return (
            <Redirect to={{
                pathname: "/cardCreator",
                state: { numberOfCards: numberOfCards }
            }} />
        )
    }

    return (
        <div style={{ margin: "200px 300px" }}>
            <h1>HOME PAGE</h1>
            {loggedIn ? <div> <h2>You are logged in, {userInfo.name}</h2>
            <span style={{ color: "grey" }}>username: </span><span>{userInfo.username}</span> <br />
            <span style={{ color: "grey" }}>email: </span><span>{userInfo.email}</span> </div> : <h1> Not logged in  </h1>}

            

            <form onSubmit={submitCardForm} style={{ marginTop: "100px" }}>
                <label htmlFor="cards"> number of cards </label>
                <select defaultValue={3} id="cards" name="cards" onChange={e => setNumberOfCards(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3} defaultValue >3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <input type="submit" value="create cards" />
            </form>
        </div>
    )
}

export default Home