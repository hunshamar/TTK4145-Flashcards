
import axios from 'axios';
import { SET_ALERT, CREATE_CARDGROUP, CREATE_CARDGROUP_ERROR, LOAD_CARDGROUPS, DELETE_CARDGROUP, DELETE_CARDGROUP_ERROR } from '../actionTypes';

export const addCardgroup = (cardgroup) => async( dispatch, getState) => {
        
    
    axios.post("/api/addcardgroup", {
            title: cardgroup.title,
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("user_token")
            }
        })
        .then(res => {
            console.log("returned")
            console.log(res.data)
            const createdCardgroup = res.data
            console.log("was created, ", createdCardgroup)
            let alert = {severity: "success", text: "successfully created cardgroup: "+createdCardgroup.title}
            dispatch({type: SET_ALERT, alert})
            dispatch({type: CREATE_CARDGROUP, createdCardgroup})
        })
        .catch(err => {
            console.log("This is an error yes plz")
            let alert = {severity: "error", text: err.toString()}
            dispatch({type: SET_ALERT, alert})
            dispatch({type: CREATE_CARDGROUP_ERROR, err})
        })

    console.log("async call up in hier", cardgroup)
    
};


export const loadCardgroups = () => async (dispatch, getState) => {
    const cardgroups = await axios.get("/api/cardgroups")
        .then(response => {
            const cardgroups = response.data
            console.log("mah cardgroups")
            console.log(cardgroups)
            dispatch({type: LOAD_CARDGROUPS, cardgroups: cardgroups})
        })
        .catch(err => console.log(err))

}

export const deleteCardgroup = (cardgroup) => async (dispatch, getState) => {
    console.log("and action")
    console.log(cardgroup.id)

    await axios.delete("/api/deletegroup/" + cardgroup.id, 
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
        dispatch({type: SET_ALERT, alert})
        dispatch({type: DELETE_CARDGROUP, cardgroup: cardgroup})        
    })
    .catch(err => {

        let alert = {severity: "error", text: err.toString()}
        dispatch({type: SET_ALERT, alert})
        dispatch({type: DELETE_CARDGROUP_ERROR, cardgroup: cardgroup}) 
    })

}




