import { useRef } from "react"
import { TextField } from '@material-ui/core';



const HTMLTextField = ({onChange, value, InputProps, fullWidth, required, multiline, rows, label}) =>{



    const inputRef = useRef()

    const addTabs = e => {
        console.log(e.key)
        if (e.key === "Tab"){
            e.preventDefault()
            console.log(inputRef)

            const { selectionStart, selectionEnd } = e.target

            const tab = "\t"

            const newValue =
              value.substring(0, selectionStart) +
              tab+
              value.substring(selectionEnd)

            // setHTMLString(newHTMLString)
            
            inputRef.current.value = newValue
            onChange(newValue)

            inputRef.current.selectionStart = inputRef.current.selectionEnd = selectionStart+tab.length
        }
    }

    return(
        <TextField
        // onKeyDown={addTabs}
        inputRef={inputRef}

        onKeyDown={addTabs}
    
        onChange={e => onChange(e.target.value)} 
        fullWidth={fullWidth}
        required={required}
        multiline={multiline}
        rows={rows}
        label={label}
        variant="outlined"
        color="secondary"
        value={value}
        InputProps={InputProps}
        
        />

    )  


}

export default HTMLTextField
