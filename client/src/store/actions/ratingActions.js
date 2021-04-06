
import axios from 'axios';
import { CREATE_RATING, LOAD_RATINGS, SET_ALERT, SET_LOADING, UPDATE_DIFFICULTY_RATING, UPDATE_QUALITY_RATING } from '../actionTypes';
import { refreshTokens } from './authActions';

export const saveQualityRating = (quality, ratingId) => async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true })
    await refreshTokens()
    await axios.patch("/api/currentuser/cardrating/" + ratingId + "/quality", {
        quality: quality,
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)


            const rating = res.data


            dispatch({ type: UPDATE_QUALITY_RATING, payload: rating })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })
    dispatch({ type: SET_LOADING, payload: false })
}


export const saveDifficultyRating = (difficulty, ratingId) => async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true })
    await refreshTokens()
    await axios.patch("/api/currentuser/cardrating/" + ratingId + "/difficulty", {
        difficulty: difficulty,
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)

            const rating = res.data


            dispatch({ type: UPDATE_DIFFICULTY_RATING, payload: rating })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })


    dispatch({ type: SET_LOADING, payload: false })

}

export const saveDuplicatesRating = (duplicates, ratingId) => async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true })
    await refreshTokens()
    await axios.patch("/api/currentuser/cardrating/" + ratingId + "/duplicates", {
        duplicates: duplicates,
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)

            const ratings = res.data


            dispatch({ type: LOAD_RATINGS, payload: ratings })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })


    dispatch({ type: SET_LOADING, payload: false })

}

export const saveRating = (rating, ratingId) => async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true })
    await refreshTokens()
    await axios.put("/api/currentuser/cardrating/" + ratingId, {
        difficulty: rating.difficulty,
        quality: rating.quality,
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token")
        }
    })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)


            const createdRating = res.data

            console.log("was created, ", createdRating)
            dispatch({ type: CREATE_RATING, payload: createdRating })
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    console.log("async call up in hier", rating)
    dispatch({ type: SET_LOADING, payload: false })

};

export const getRating = (cardId) => async (dispatch, getState) => {
    // await refreshTokens()

    await axios.get("/api/currentuser/cardrating/" + cardId,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)

            if (res.data.status !== "no rating") {

                const foundRating = res.data

                console.log("was found, ", foundRating)
                // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
                // dispatch({type: SET_ALERT, payload: alert})
                dispatch({ type: CREATE_RATING, payload: foundRating })
            }
        })
        .catch(err => {
            console.log("Error ", err)
            const alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    // console.log("async call up in hier", rating)

};


export const getRatingsInPeerreview = (peerreviewid) => async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true })
    await refreshTokens()
    console.log("Is this ratings her ja")
    await axios.get("/api/currentuser/peerreview/" + peerreviewid + "/cardratings",
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {

            console.log("hes")

            if (res.data.error) {
                throw new Error(res.data.error)
            }
            console.log("returned from ratings", res.data)



            const foundRatings = res.data

            console.log("was found getratingsinpeererview, ", foundRatings)
            // let alert = {severity: "success", text: "Saved rating on card: "+cardNumber}
            // dispatch({type: SET_ALERT, payload: alert})
            dispatch({ type: LOAD_RATINGS, payload: foundRatings })

        })
        .catch(err => {
            console.log("Not found")
            let alert = { severity: "error", text: err.toString() }
            dispatch({ type: SET_ALERT, payload: alert })
        })

    dispatch({ type: SET_LOADING, payload: false })
    // console.log("async call up in hier", rating)

};

