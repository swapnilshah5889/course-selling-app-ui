import { Typography, Alert, IconButton } from "@mui/material";
import MyButton from "../../components/button/button.component";
import './sign-up.page.styles.scss';
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import InputField from "../../components/inputfield/inputfield.component";
import { FacebookAuthProvider, getRedirectResult, signInWithPopup } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    signInWithFacebookPopup
} from "../../utils/firebase";
import GoogleIcon from '../../assets/google.png';
import FacebookIcon from '../../assets/facebook.png';

const loginText = ["SIGN UP", "SIGNING UP..."];
const requiredText = "*Required";
const SignUp = (props) => {

    const [loginDisabled, setLoginDisabled] = useState(false);
    const[loginTextIndex, setLoginBtnIndex] = useState(0);
    const [signupDisabled, setSignupDisabled] = useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [alertShow, setAlertShow] = useState(false);
    const [alertText, setAlertText] = useState("");

    // This function checks after google authentication redirect
    // Whether the process was successful or not
    const checkIfUserAuthenticated = async () => {
        const response =  await getRedirectResult(auth);
        if(response) {
            console.log("Auth Response: ")
            console.log(response)
            const {user} = response;
            console.log(user);  
            if(user.emailVerified) {
                console.log("Email Verified");
                //Insert data into database
            }
        }
        else {
            console.log("Auth Error: ")
            console.log(response)
            if(response!=null) {
                
                setAlertText("Something went wrong. Please try again later.")
                setAlertShow(true);
            }
        }
    };
    
    useEffect(() => {
        checkIfUserAuthenticated();
    }, [])

    const handleFacebookAuth = async () => {
        try {
            
            const result = await signInWithFacebookPopup();
            console.log("Result : ")
            console.log(result);
            const user = result.user;        
            const credential = FacebookAuthProvider.credentialFromResult(result);
            
        } catch (error) {

            // Email already registered with other method
            if(error.code == 'auth/account-exists-with-different-credential') {
                console.log("User already exists authenticated with different method")
                setAlertText("User already registered using different account.")
                setAlertShow(true);
            }
            // Something went wrong, try again later
            else {
                setAlertText("Something went wrong. Please try again later.")
                setAlertShow(true);
            }

        }
    }

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
            
            {/* Alert */}
            <Collapse 
                in={alertShow}
                className="signup-alert-ctn"
                >
                <Alert 
                    severity="warning"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlertShow(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    {alertText}
                </Alert>
            </Collapse>

            {/* Sign Up Card */}
            <Card className="signup-card">   

                {/* Card Header */}
                <Typography 
                    className="header"
                    variant="h6">Welcome to Coursera</Typography>

                {/* Input form */}
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

                {/* Login Button */}
                <div className="btn-container">
                    <MyButton 
                        btnText={loginText[loginTextIndex]}
                        variant="primary"
                        size="lg"
                        btnDisabled={loginDisabled}
                        handleClick = {handleLoginClick}
                    />
                </div>
                
                {/* Or Separator */}
                <div className="signup-or-separator">
                    <hr className="or-separator-line"/>
                    <p className="or-separtor-text">Or</p>
                    <hr className="or-separator-line"/>
                </div>

                <br />

                {/* Firebase Authentication */}
                <div className="firebase-auth-ctn">
                    <img 
                        className="firebase-img-btn" 
                        onClick={signInWithGoogleRedirect} 
                        src={GoogleIcon} 
                        alt="google" />
                    <img 
                        onClick={handleFacebookAuth}
                        className="firebase-img-btn" 
                        src={FacebookIcon} 
                        alt="facebook" />
                </div>
            </Card>

        </div>
    );
}

export default SignUp;