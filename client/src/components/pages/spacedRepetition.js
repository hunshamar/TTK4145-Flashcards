import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PageWrapper } from "../../static/wrappers"
import { getCardreviewDeck } from "../../store/actions/studyActions"




const SpacedRepetition =  () => {

    const dispatch = useDispatch()
    const cardreviewDeck = useSelector(state => state.studyReducer)

    useEffect(() => {
        dispatch(getCardreviewDeck())
    }, [])


    return(
        <PageWrapper>
            spaced rep
            {JSON.stringify(cardreviewDeck)}
        </PageWrapper>
    )


}

export default SpacedRepetition