
import React, {useState} from "react"
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import {TextField, Card} from '@material-ui/core/';

import { Icon, IconButton } from '@material-ui/core';

import theme from "../static/theme"
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';

let formData = []
for (let i = 0; i < 3; i++){
    formData.push("")
}

const CardForm = props => {
    const [front, setFront] = useState("");
    // const [back, setBack] = useState({});

    const handleChange = e => {
        console.log(e.target.value)
        // formData[props.formNumber] += e.target.value
        setFront(e.target.value)
        formData[props.formNumber] = front
    }
    

    return(
        <Grid container spacing={2} >
            <Grid item xs={12}>

                <h2>Card #{props.formNumber+1}</h2>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    key={props.formNumber}
                    onChange={handleChange}
                    id="asd"
                    label="Front"
                    multiline
                    rows={4}
                    defaultValue=""
                    // value={formData[props.formNumber]}
                    value={front}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            {/* <Grid item xs={12}>
                <TextField
                    id={`${props.formNumber}`}
                    label="Back"
                    multiline
                    onChange={e => setBack(e.target.value)}
                    fullWidth
                    rows={4}
                    value={back}
                    defaultValue=""
                    variant="outlined"
                />
            </Grid> */}

        </Grid>
    )
}

const Stepper = props => {


    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.maxSteps;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    const formList = []

    for(let i = 0; i < maxSteps; i++){
        formList.push(<CardForm formNumber={i} />)
    }

    return(
        <div style={{margin: "100px"}}>
            <Card style={{padding: "50px"}}>
            {/* <CardForm formNumber={activeStep}  /> */}
            {formList[activeStep]}
            <MobileStepper 
                steps={maxSteps}
                position="static"
                variant="text"                 
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                    }
            
            />
            </Card>
        </div>
    )
}



const CardCreator = (props) => {

  


    let number = props.location.state ? props.location.state.numberOfCards : -1

    if (number === -1){
        return(
            <Redirect to="/" /> 
        )
    }


    

    return(
        <div style={{}}> 
            <Link to="/">
            <IconButton>
                 <ArrowBackIcon /> 
            </IconButton>
            </Link>
            
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
               

                <Stepper maxSteps={number} style={{margin: "400px"}}/>
      </ThemeProvider>
        </div>
    )
}

export default CardCreator