import { Typography } from "@mui/material";
import MyButton from "../../components/button/button.component";
import './sign-up.page.styles.scss';
import { useState } from "react";
import { Card } from "react-bootstrap";
import InputField from "../../components/inputfield/inputfield.component";

const loginText = ["Login", "Logging in..."];
const requiredText = "*Required";
const SignUp = (props) => {

    const [loginDisabled, setLoginDisabled] = useState(false);
    const[loginTextIndex, setLoginBtnIndex] = useState(0);
    const [signupDisabled, setSignupDisabled] = useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const validateInputs = () => {
        let allValid = true;
        if(emailText.length==0) {
            setEmailError(true);
            allValid = false;
        }        

        if(passwordText.length == 0) {
            setPasswordError(true);
            allValid = false;
        }
        return allValid;
    }

    const onEmailChange = (emailStr) => {
        setEmailError(false);
        setEmailText(emailStr);
    }

    const onPasswordChange = (passwordStr) => {
        setPasswordError(false);
        setPasswordText(passwordStr);
    }
    const handleLoginClick = (event) => {
        if(validateInputs()) {
            setLoginDisabled(!loginDisabled);
            setLoginBtnIndex((loginTextIndex+1)%2)
        }
    }

    const handleSignUpClick = (event) => {
        setLoginDisabled(!loginDisabled);
        setLoginBtnIndex((loginTextIndex+1)%2)
    }
    return (
        <div className="signup-container">
            
            <Card className="signup-card">   

                <Typography 
                    className="header"
                    variant="h6">Welcome to Coursera</Typography>

                <div className="input-fields">
                    <InputField 
                        className="input-field"
                        variant = "outlined"
                        label="Email"
                        type="email"
                        isError={isEmailError}
                        helperText={requiredText}
                        onTextChange = {onEmailChange}
                    />
                    <InputField 
                        className="input-field"
                        variant = "outlined"
                        label="Password"
                        type="password"
                        isError={isPasswordError}
                        helperText={requiredText}
                        onTextChange = {onPasswordChange}
                    />
                </div>
                <br/>
                <div className="btn-container">
                    <MyButton 
                        btnText={loginText[loginTextIndex]}
                        variant="primary"
                        size="lg"
                        btnDisabled={loginDisabled}
                        handleClick = {handleLoginClick}
                    />
                </div>
            </Card>


        </div>
    );
}

export default SignUp;