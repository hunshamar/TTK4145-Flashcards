import { PageWrapper } from "../../static/wrappers"
import { useDispatch, useSelector } from 'react-redux';
import userReducer from '../../store/reducers/userReducer';
import { useEffect } from 'react';
import {  getUsersStatus } from '../../store/actions/userActions';
import { DataGrid } from '@material-ui/data-grid';
import CardgroupSelect from '../submodules/cardgroupselect';
import { useState } from 'react';
import { Typography } from "@material-ui/core";


 const DeliveryStatus = () => {

    const dispatch = useDispatch()
    // const users = useSelector(state => state.userReducer.users)
    const status = useSelector(state => state.userReducer.status)

    const [cardGroupId, setCardGroupId] = useState(0)


    useEffect(() => {
        dispatch(getUsersStatus(cardGroupId))
        console.log("status")
        console.log(status)
    }, [dispatch, cardGroupId])
    
    console.log("usars")

    

    const columns = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'delivered', headerName: 'Delivered', type: "number", width: 130 },
        {
          field: 'toDeliver',
          headerName: 'To Deliver',
          type: 'number',
          width: 130,
        },
        { field: 'complete', headerName: 'Complete', type: "number", width: 130 },      
    ]      

    let rows = status.map(s => (
        {
            id: s.user.id, 
            username: s.user.username, 
            delivered: s.delivered, 
            toDeliver: s.cardgroup.numberOfCardsDue,
            complete: s.delivered == s.cardgroup.numberOfCardsDue ? true : false
        }
    ))

    
      
    
    const dateToString = date => {
        let a = new Date(date.year, date.month-1, date.date, date.hour, date.minute)
            console.log("aa", a)
            // return a.getUTCMonth()
            return a.toString()
      }
    
    console.log("cgid", cardGroupId)
    return (
        <PageWrapper>       
            <div style={{marginBottom: "15px"}} >
                <CardgroupSelect onChange={setCardGroupId} />
                <Typography variant="subtitle2" style={{marginTop: "20px"}}>
                {status[0] ? "Due: " + dateToString(status[0].cardgroup.dueDate) : "Due:"}
                </Typography>
            </div>

                <div style={{ height: 400, width: '100%' }}>
 
                <DataGrid rows={rows} columns={columns} pageSize={5}  />
            </div>
        </PageWrapper>
    )
}

export default DeliveryStatus