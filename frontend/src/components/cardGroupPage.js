
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCards } from '../store/actions/cardActions';
import CardView from './submodules/cardview';





const CardGroupPage = props => {

    const cards = useSelector(state => state.cardReducer.cards)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadCards(props.match.params.id))        
    }, [])   


    return(
        <div>
            <h1>props: {props.match.params.id}</h1>
            <CardView cards={cards}/>
        </div>
    )

  
}

export default CardGroupPage