import { PageWrapper } from "../../static/wrappers"
import { useDispatch, useSelector } from 'react-redux';
import userReducer from '../../store/reducers/userReducer';
import { useEffect } from 'react';
import {  getUsersStatus } from '../../store/actions/userActions';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import CardgroupSelect from '../submodules/cardgroupselect';
import { useState } from 'react';
import { Typography } from "@material-ui/core";
import { loadCardgroupFlashcards } from "../../store/actions/cardActions";
import CardDialog from "../dialogs/cardDialog";
import Loading from "../notifications/loading";


 const AllCards = () => {

    const dispatch = useDispatch()
    const cards = useSelector(state => state.cardReducer.cards)
    const [openCard, setOpenCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})

    const loading = useSelector(state => state.loadingReducer.loading)

    const [cardGroupId, setCardGroupId] = useState(0)


    useEffect(() => {
        dispatch(loadCardgroupFlashcards(cardGroupId)) 
        console.log("status")
        
    }, [dispatch, cardGroupId])
    
    console.log("cards")
    console.log(cards)

    const columns = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'front', headerName: 'Card Front', width: 130 },
        { field: 'back', headerName: 'Card Back', width: 130 },
        { field: 'nRatings', headerName: 'N Ratings', width: 130 },
        { field: 'averageRating', headerName: 'Avg Rating', width: 130 },
    ]      

    let rows = cards.map(c => (
        {
            id: c.id,
            name: c.user ? c.user.name: "",
            username: c.user ? c.user.username: "",
            front: c.front,
            back: c.back,
            nRatings: c.nRatings,
            averageRating: c.averageRating
        }
    ))
    
    const handleClick = e => {
        console.log("print", e.row)
        setSelectedCard(e.row)
        setOpenCard(true)
    }
    
    console.log("cgid", cardGroupId)
    return (
        <PageWrapper>       
            <CardDialog open={openCard} onClose={() => setOpenCard(false)} card={selectedCard} />
            <div style={{marginBottom: "15px"}} >
                <CardgroupSelect onChange={setCardGroupId} showFirst />
            </div>

                <div style={{ height: "400px", width: '100%' }}>

                {loading ? <Loading /> : 

                cards.length ? 
                <DataGrid 
                    onCellClick={e => handleClick(e)} rows={rows} columns={columns} pageSize={10}                   
                />
                : "No flashcards for this cardgroup"
                }
            </div>
        </PageWrapper>
    )
}

export default AllCards




// import {useDispatch, useSelector} from "react-redux"
// import { useEffect } from 'react';
// import { loadCards, loadCardgroupFlashcards } from '../../store/actions/cardActions';
// import CardView from '../submodules/cardview';
// import {PageWrapper} from "../../static/wrappers"

// const AllCards = props => {

//     const cards = useSelector(state => state.cardReducer.cards)
    
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(loadCards())   
//     }, [dispatch])   


//     return(
//         <PageWrapper> 
//             <CardView cards={cards}/>
//         </PageWrapper>
//     )
// }

// export default AllCards