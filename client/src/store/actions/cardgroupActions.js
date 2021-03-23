
import axios from 'axios';
import { SET_ALERT, CREATE_CARDGROUP, SET_LOADING, LOAD_CARDGROUPS, DELETE_CARDGROUP, DELETE_CARDGROUP_ERROR, LOAD_CARDGROUP, EDIT_CARDGROUP } from '../actionTypes';
import { refreshTokens } from './authActions';


export const addCardgroup = (cardgroup) => async( dispatch, getState) => {
    await refreshTokens()
        
    
    console.log("c cardgroup")
    console.log(cardgroup)

    axios.post("/api/admin/cardgroups", {
            title: cardgroup.title,
            numberOfCardsDue: cardgroup.numberOfCardsDue,
            dueDate: cardgroup.dueDate
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)
       


            const createdCardgroup = res.data
            console.log(createdCardgroup.dueDate)

            console.log("was created, ", createdCardgroup)
            let alert = {severity: "success", text: "successfully created cardgroup: "+createdCardgroup.title}
            dispatch({type: SET_ALERT, payload: alert})
            dispatch({type: CREATE_CARDGROUP, payload: createdCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    console.log("async call up in hier", cardgroup)
    
};

export const editCardgroup = (cardgroup) => async( dispatch, getState) => {
    await refreshTokens()

    console.log("we editing")

    axios.put(`/api/admin/cardgroups/${cardgroup.id}`, {
            title: cardgroup.title,
            numberOfCardsDue: cardgroup.numberOfCardsDue,
            dueDate: cardgroup.dueDate
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            if(res.data.error){
                throw new Error(res.data.error)
            }
            console.log("returned")
            console.log(res.data)
            

            const editedCardgroup = res.data

            let alert = {severity: "success", text: "successfully edited cardgroup: "+editedCardgroup.title}
            dispatch({type: SET_ALERT, payload: alert})
            dispatch({type: EDIT_CARDGROUP, payload: editedCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, payload: alert})
            // dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    console.log("async call up in hier", cardgroup)
    
};


export const loadCardgroups = () => async (dispatch, getState) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()


    await axios.get("/api/cardgroups")
    .then(res => {
        if(res.data.error){
            console.log("error")
            throw new Error(res.data.error)
        }
        const cardgroups = res.data
        console.log("mah cardgroups")
        
        console.log(cardgroups)
        dispatch({type: LOAD_CARDGROUPS, payload: cardgroups})
    })
    .catch(err => console.log(err))

    dispatch({type: SET_LOADING, payload: false})
}



export const loadCardgroup = (groupId) => async (dispatch) => {
    dispatch({type: SET_LOADING, payload: true})
    await refreshTokens()

    await axios.get("/api/cardgroups/"+groupId)
    .then(res => {
        console.log("res,", res)
        if(res.data.error){
            console.log("error")
            throw new Error(res.data.error)
        }
        const cardgroup = [res.data]
        console.log("cardgroup found")
        
        console.log(cardgroup)
        dispatch({type: LOAD_CARDGROUP, payload: cardgroup})
    })
    .catch(err => {
        let alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, payload: alert})
    })

    dispatch({type: SET_LOADING, payload: false})

}

export const deleteCardgroup = (cardgroup) => async (dispatch, getState) => {
    await refreshTokens()
    console.log("and action")
    console.log(cardgroup.id)

    await axios.delete("/api/admin/cardgroups/" + cardgroup.id, 
    {headers: { 
        Authorization: "Bearer " +localStorage.getItem("user_token") 
    }}
    ).then(res => {
        console.log("to be deleted")
        if(res.data.error){
            console.log("error")
            throw new Error(res.data.error)
        }

        let alert = {severity: "success", text: "successfully deleted cardgroup: "+cardgroup.title}
        dispatch({type: SET_ALERT, payload: alert})
        dispatch({type: DELETE_CARDGROUP, payload: cardgroup})        
    })
    .catch(err => {

        let alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, payload: alert})
        // dispatch({type: DELETE_CARDGROUP_ERROR, payload: cardgroup}) 
    })

}




