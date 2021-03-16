import { Button, Dialog, Box } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, removeAdmin } from '../../store/actions/userActions';
import { useEffect } from 'react';
import userReducer from '../../store/reducers/userReducer';
import CardView from '../submodules/cardview';

const CardDialog = (props) =>  {
    const { onClose, selectedValue, open, card } = props;
   
    // const dispatch = useDispatch()

    const handleClose = () => {
      onClose(selectedValue);
    };
    
    // const makeAdmin = () => {
    //     dispatch(addAdmin(user))
    //     handleClose()
    // }

    // const unmakeAdmin = () => {
    //     dispatch(removeAdmin(user))
    //     handleClose()
    // }
   
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Box style={{width:"400px", height: "auto", margin: 0}} >



          <CardView cards={[card]} />

          </Box>
      </Dialog> 
    );
  }
  
  export default CardDialog