
import { useState } from 'react';
import { Button, Card, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {connect, useDispatch, useSelector, shallowEqual} from "react-redux"
import { useEffect } from 'react';
import { Grid, Link } from '@material-ui/core/';
import {  Alert } from '@material-ui/lab/';
import axios from "axios"
import {compose} from "redux"
import { fetchCards, loadCards, deleteCard, addCard } from '../store/actions/cardActions';
import cardReducer from '../store/reducers/cardReducer';
import CardView from './submodules/cardview';
import {PageWrapper} from "../static/wrappers"

const AllCards = props => {

    const cards = useSelector(state => state.cardReducer.cards)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadCards())        
    }, [])   


    return(
        <PageWrapper> 
        <CardView cards={cards}/>
        </PageWrapper>
    )
}

export default AllCards