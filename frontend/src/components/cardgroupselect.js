import React, {useEffect} from "react"
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from "@material-ui/core"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadCards } from "../store/actions/cardActions";
import { loadCardgroups } from "../store/actions/cardgroupActions";






const CardgroupSelect = props => {

    

    const cardgroups = useSelector(state => state.cardgroupReducer.cardgroups)
    
    const dispatch = useDispatch();

    // console.log("is token?", localStorage.getItem("user_token"))

    useEffect(() => {
        dispatch(loadCardgroups())
    }, [])   

    let cardgroupMenuitems = []

    cardgroups.map((cardgroup, index) => (

        cardgroupMenuitems[index] = <MenuItem key={index} value={cardgroup.id}>{cardgroup.title}</MenuItem>
            
    ))
  
    const [age, setAge] = React.useState('');
    

    const handleChange = (event) => {
      setAge(event.target.value);
      props.onChange(event.target.value)
    };
  

    return(
        <FormControl fullWidth variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Cardgroup</InputLabel>
            <Select
            required
            color="secondary"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Age"
            >
            
            {cardgroupMenuitems.length ? cardgroupMenuitems : <MenuItem value="">
                <em>No groups exists</em>
            </MenuItem> }

            </Select>
      </FormControl>
    )

}

export default CardgroupSelect