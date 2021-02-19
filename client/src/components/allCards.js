

import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import {  loadCards } from '../store/actions/cardActions';
import CardView from './submodules/cardview';
import {PageWrapper} from "../static/wrappers"

const AllCards = props => {

    const cards = useSelector(state => state.cardReducer.cards)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCards())   
    }, [dispatch])   


    return(
        <PageWrapper> 
            <CardView cards={cards}/>
        </PageWrapper>
    )
}

export default AllCards