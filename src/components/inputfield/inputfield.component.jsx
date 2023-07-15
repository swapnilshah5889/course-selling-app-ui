import { TextField, useScrollTrigger } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from "react";

const InputField = (props) => {
    const [inputSize, setInputSize] = useState("medium");
    const {className, variant, label, type, onTextChange} = props
    let helperText = "";
    const isError = ("isError" in props)?props.isError : false;
    if(isError) {
        helperText = ("helperText" in props)?props.helperText : "";
    }

    const isSmallScreen = useMediaQuery('(min-width:750px)');

    // Controls responsive textfield size
    useEffect(() => {
      if(!isSmallScreen) {
        console.log("Small triggered")
        setInputSize("small");
      }
      else {
        setInputSize("medium");
        console.log("other triggered")
      }
    }, [isSmallScreen])
    

    const handleTextChange = (event) => {
        onTextChange(event.target.value);
    }
    return (
        <TextField 
            className={className}
            variant={variant}
            label={label}
            type={type}
            helperText={helperText}
            error={isError}
            onChange={handleTextChange}
            size={inputSize}
        />
    )
}

export default InputField;