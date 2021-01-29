
import axios from 'axios';



export const signInCallack = () => async (dispatch, getState) => {
    axios.get("http://localhost:5000/api/login/callback", { withCredentials: true })
        .then(response => {
            let user_token = response.data
            console.log("action, usertoken", user_token)
            localStorage.setItem("user_token", user_token)
            dispatch({type: "LOG_IN_CALLBACK", loggedIn: true})
        })
        .catch(err => console.log(err))
}

export const signOut = () => async (dispatch, getState) => {
    // axios.get("http://localhost:5000/api/login/callback", { withCredentials: true })
    //     .then(response => {
    //         let user_token = response.data
    //         console.log("action, usertoken", user_token)
    //         localStorage.setItem("user_token", user_token)
    //         dispatch({type: "LOG_IN_CALLBACK", loggedIn: true})
    //     })
    //     .catch(err => console.log(err))
    console.log("me out")
    dispatch({type: "LOG_OUT", loggedIn: false})

}

// export const loadCards = () => async (dispatch, getState) => {
//     const cards = await axios.get("http://localhost:5000/api/flashcards")
//         .then(response => {
//             const cards = response.data
//             console.log("mah cah")
//             console.log(cards)
//             dispatch({type: "LOAD_CARDS", cards: cards})
//         })
//         .catch(err => console.log(err))

// }

  
//   export const signOut = () => {
//     return (dispatch, getState, {getFirebase}) => {
//       const firebase = getFirebase();
  
//       firebase.auth().signOut().then(() => {
//         dispatch({ type: 'SIGNOUT_SUCCESS' })
//       });
//     }
//   }