
import { Button, 
    Grid, 
    TextField,
    Dialog,
    Typography,
    makeStyles,
    Input,
    InputAdornment,
    IconButton,
    Tooltip
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import {  useDispatch } from 'react-redux';
import { addCard, editCard } from '../../store/actions/cardActions';
import UploadImage from '../submodules/uploadImage';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import HTMLTextField from '../submodules/HTMLTextField';
import FlashcardStudy from '../submodules/flashcardStudy';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100vh",
        },
    },
}))

const CreateCardDialog = (props) => {
    const { onClose, selectedValue, open } = props;
    const dispatch = useDispatch();    
    const classes = useStyles()
    const cardgroupId = props.cardgroupId

    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [preview, setPreview] = useState(false)

    useEffect(() => {
        if (props.card){
            console.log("cccc", props.card)
            setFront(props.card.front)
            setBack(props.card.back)
        }
    }, [props.card])
   
    const submit = e => {
        e.preventDefault()
              
        if (front && back && (cardgroupId || props.card.id)){
            if (props.card){
                dispatch(editCard({
                    front: front,
                    back: back,
                    id: props.card.id
                }))
            }               
            else{
                dispatch(addCard({
                    front: front,
                    back: back,
                    cardgroupid: cardgroupId
                }))
            }
            setFront("")
            setBack("")
            handleClose()
            
        }
        else{
            alert("fill inn all fields")
            console.log(front, back, cardgroupId)
        }
    }

    const handleClose = () => {
        setPreview(false)
        onClose(selectedValue);
    };
  
  
    return (
      <Dialog onClose={handleClose} 
        className={classes.dialog}

       open={open} >

        <form onSubmit={submit} style={{margin: "40px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <Typography variant="h5"> {props.card ? "Edit Flashcard" : "Create a flashcard. This can be edited later"} </Typography>
                    <Typography variant="body2" color="textSecondary"> You can write either pure text or use HTML. <Link  to="/htmlguide" target="_blank">HTML Guide</Link> 
                    <br/>
                    Make sure the Card looks good in <i>Preview Flashcard</i> if writing in HTML.
                     </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <CardgroupSelect onChange={e => setCardgroupid(e)} />
                </Grid> */}
                <Grid item xs={12}>
                
                <HTMLTextField 
                    onChange={setFront} 
                    value={front} 
                    label="Front (question)"
                    fullWidth 
                    required
                    multiline
                    rows={7}
                />
{/* 
                <TextField
                    onChange={e => setFront(e.target.value)} 
                    fullWidth 
                    required
                    variant="outlined"
                    color="secondary"
                    label="Front"
                    value={front}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end" style={{margin: "auto 0 15px"}}>
                    //         <div>
                    //             <Tooltip title="Preview HTML">
                    //                 <IconButton onClick={() => setPreviewFront(true)}>
                    //                     <VisibilityIcon color="secondary" />
                    //                 </IconButton>
                    //             </Tooltip>
                    //         </div>
                    //     </InputAdornment>,
                    // }}
                    multiline
                    rows={4}
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField 
                        onChange={e => setBack(e.target.value)}
                        id="asd"
                        label="Back"
                        color="secondary"
                        multiline
                        rows={4}
                        defaultValue=""
                        value={back}
                        fullWidth
                        required
                        variant="outlined"
                    /> */}
                    <HTMLTextField 
                        onChange={setBack}
                        label="Back (answer)"
                        multiline
                        rows={7}
                        value={back}
                        fullWidth
                        required
                    />
                </Grid>
                
                <Grid item xs={12} style={{textAlign: "center"}}>
                    {preview ?                     
                    <Box border={1} borderColor="secondary.light" borderRadius={5} align="center" mb="5px"> 
                        <FlashcardStudy flashcard={{front, back}} revealback={true} />
                    </Box> : ""}
                    <Button fullWidth color="secondary" variant="outlined" endIcon={<VisibilityIcon />} onClick={() => setPreview(!preview)}>
                     {preview ? "Hide Preview" : "Preview Flashcard"}
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClose} fullWidth color="primary"  >Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                <Button type="submit" fullWidth style={{backgroundColor: front && back ? "green" : "grey", color: "white"}}>Submit {props.card ? "Edit" : ""}</Button>
                </Grid>

            </Grid>
                </form>

        

      </Dialog>
    );
}

export default CreateCardDialog