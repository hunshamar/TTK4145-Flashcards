import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from 'axios';
import { Redirect } from "react-router-dom"
import authReducer from '../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { signInCallack, checkLogInStatus } from '../store/actions/authActions';


const Home = () => {

    // fetch("http://localhost:5000/api/login/callback",
    // { credentials: 'include' }).then(response => {
    //     return response.text()
    // }).then(data => {
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
    const loggedInuser = useSelector(state => state.authReducer.loggedInUser)
    const dispatch = useDispatch();
   


    const submitCardForm = e => {
        e.preventDefault()
        setredirectToNewPage(true)
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
            {loggedInuser ? <div> <h2>You are logged in, {loggedInuser.name}</h2>
            <span style={{ color: "grey" }}>username: </span><span>{loggedInuser.username}</span> <br />
            <span style={{ color: "grey" }}>email: </span><span>{loggedInuser.email}</span> </div> : <h1> Not logged in  </h1>}

            

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