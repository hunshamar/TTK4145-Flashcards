import { PageWrapper } from "../../static/wrappers"
import { useDispatch, useSelector } from 'react-redux';
import userReducer from '../../store/reducers/userReducer';
import { useEffect } from 'react';
import { getUsers } from '../../store/actions/userActions';
import { DataGrid } from '@material-ui/data-grid';


 const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    
    console.log("usars")
    console.log(users)

    const columns = [
        {field: "username", headerName: "username", width: "150px"},
        {field: "name", headerName: "name", width: "150px"},
        {field: "email", headerName: "email", width: "150px"}
    ]      

    const rows = users
    
    console.log("page 1111")
    return (
        <PageWrapper>       
                <div style={{ height: 400, width: '100%' }}>
 
            <DataGrid rows={rows} columns={columns} pageSize={5}  />
            </div>
        </PageWrapper>
    )
}

export default Users