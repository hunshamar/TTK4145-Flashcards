import { PageWrapper } from "../../static/wrappers"
import { useDispatch, useSelector } from 'react-redux';
import userReducer from '../../store/reducers/userReducer';
import { useEffect } from 'react';
import {  getUsersStatus } from '../../store/actions/userActions';
import { DataGrid } from '@material-ui/data-grid';
import CardgroupSelect from '../submodules/cardgroupselect';
import { useState } from 'react';
import { Typography } from "@material-ui/core";
import { loadCardgroupFlashcards } from "../../store/actions/cardActions";
import CardDialog from "../dialogs/cardDialog";


 const AllCards = () => {

    const dispatch = useDispatch()
    const cards = useSelector(state => state.cardReducer.cards)
    const [openCard, setOpenCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})


    const [cardGroupId, setCardGroupId] = useState(0)


    useEffect(() => {
        if(cardGroupId){
            dispatch(loadCardgroupFlashcards(cardGroupId)) 
            console.log("status")
        }
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
                <CardgroupSelect onChange={setCardGroupId} />
                <Typography variant="subtitle2" style={{marginTop: "20px"}}>
                {/* {status[0] ? "Due: " + dateToString(status[0].cardgroup.dueDate) : "Due:"} */}
                </Typography>
            </div>

                <div style={{ height: 400, width: '100%' }}>
 
                <DataGrid  onCellClick={e => handleClick(e)} rows={rows} columns={columns} pageSize={5}  />
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