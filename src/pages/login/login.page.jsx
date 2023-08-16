import { Typography, Alert, IconButton } from "@mui/material";
import MyButton from "../../components/button/button.component";
import './login.page.styles.scss';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import APIS from '../../utils/api_urls.js';
import {userTokenLCKey, userEmailLCKey} from '../../utils/constants.js';
import { useSetRecoilState } from "recoil";
import { userStateAtom } from "../../store/atoms/user";

const signupText = ["LOGIN", "LOGGING IN..."];
const requiredText = "*Required";
const LoginPage = (props) => { 

    const setUserState = useSetRecoilState(userStateAtom);
    const navigate = useNavigate();
    const[signupTextIndex, setSignupBtnIndex] = useState(0);
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState(requiredText);
    const [emailErrorText, setEmailErrorText] = useState(requiredText);
    const [alertShow, setAlertShow] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [disableAllInputs, setDisableAllInputs] = useState(false);
    const [inputErrorText, setInputErrorText] = useState(requiredText);

    // This function checks after google authentication redirect
    // Whether the process was successful or not
    const checkIfUserAuthenticated = async () => {
        const response =  await getRedirectResult(auth);
        setDisableAllInputs(true);
        try {
            if(response) {
                const {user} = response;
                if(user.emailVerified) {
                    userFirebaseLogin(user.email, user.accessToken);
                }
            }
            else {
                setDisableAllInputs(false);
                if(response!=null) {
                    console.log("Auth Error: ")
                    console.log(response)
                    setAlertText("Something went wrong. Please try again later.")
                    setAlertShow(true);
                }
            }
        } catch (error) {
            setAlertText("Something went wrong. Please try again later.")
            setAlertShow(true);
            setDisableAllInputs(false);
        }
    };

    // Call firebase login API to verify the token and email and fetch JWT Token
    const userFirebaseLogin = async (email, accessToken) => {
        try {
            const body = {username:email, token:accessToken};
            const resp = await fetch(APIS.FirebaseLoginAPI, {
                method:'POST',
                headers:{
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body)
            })

            if(resp.status == 200){
                const loginResponse = await resp.json();
                console.log(loginResponse);
                setUserLoggedIn(email, loginResponse.token);
                navigateToHome(); 
            }
            else {
                setAlertText("Login failed!")
                setAlertShow(true);
            }
            setDisableAllInputs(false);
        } catch (error) {
            setAlertText("Something went wrong. Please try again later.")
            setAlertShow(true);
            setDisableAllInputs(false);
        }
    } 


    // If user already logged in then redirect to home
    function checkIfUserAlreadyLoggedIn() {
        if(localStorage.getItem(userTokenLCKey)) {
            navigateToHome();
        }
    }
    
    // Firebase Redirect Check
    useEffect(() => {
        checkIfUserAlreadyLoggedIn();
        checkIfUserAuthenticated();
    }, [])

    // Handle Facebook Auth
    const handleFacebookAuth = async () => {
        try {
            
            const result = await signInWithFacebookPopup();
            console.log("Result : ")
            console.log(result);
            const user = result.user;        
            userFirebaseLogin(user.email, user.accessToken);
            
        } catch (error) {

            // Email already registered with other method
            if(error.code == 'auth/account-exists-with-different-credential') {
                console.log("User already exists authenticated with different method")
                setAlertText("This email is already registered using different account.")
                setAlertShow(true);
            }
            // Something went wrong, try again later
            else {
                console.log(error);
                setAlertText("Something went wrong. Please try again later.")
                setAlertShow(true);
            }

        }
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Signup Form Validation
    const validateInputs = () => {
        let allValid = true;
        // Email required
        if(emailText.length==0) {
            setEmailError(true);
            setEmailErrorText(requiredText);
            allValid = false;
        }        
        // Invalid email
        else if(!validateEmail(emailText)) {
            setEmailError(true);
            setEmailErrorText("Invalid Email");
            allValid = false;
        }

        if(passwordText.length == 0) {
            setPasswordError(true);
            setPasswordErrorText(requiredText);
            allValid = false;
        }
        else if(passwordText.length<8) {
            setPasswordErrorText("Password must be of minimum 8 characters");
            setPasswordError(true);
            allValid = false;
        }

        return allValid;
    }

    // Email Change Event 
    const onEmailChange = (emailStr) => {
        setEmailError(false);
        setEmailText(emailStr);
    }

    // Password change event
    const onPasswordChange = (passwordStr) => {
        setPasswordError(false);
        setPasswordText(passwordStr);
    }

    // Handle Login click 
    const handleSignUpClick = async (event) => {
        try {
            if(validateInputs()) {
                
                //Disable Inputs
                setDisableAllInputs(true);
                setSignupBtnIndex(1)
                // Login API call
                const headers = new Headers();
                headers.append('username', emailText);
                headers.append('password', passwordText);
                const resp = await fetch(APIS.LoginAPI, {
                    method:'POST',
                    headers:headers
                })
                // Successful API Call
                if(resp.status==200) {
                    const response = await resp.json();
                    // Successful Login
                    if(response.status) {
                        // window.location = '/';
                        setUserLoggedIn(emailText, response.token);
                        navigateToHome();
                    }
                    // Login Failed
                    else {
                        setAlertShow(true);
                        setAlertText(response.message);
                    }
                }
                else {
                    setAlertShow(true);
                    setAlertText("Something went wrong. Please try again.");
                }
                // Enable Inputs
                setDisableAllInputs(false);
                setSignupBtnIndex(0)
            }
        } catch (error) {
            setAlertShow(true);
            setAlertText("Something went wrong. Please try again later.")
            setDisableAllInputs(false);
            setSignupBtnIndex(0)
            console.log(error);
        }
    }

    // Set User Logged In - Recoil State
    const setUserLoggedIn = function(email, token) {
        try {
            localStorage.setItem(userTokenLCKey, token);
            localStorage.setItem(userEmailLCKey, email);
            setUserState({
            isLoggedIn : true,
            userEmail : localStorage.getItem(userEmailLCKey),
            token : localStorage.getItem(userTokenLCKey)
            });

            
        } catch (error) {
            console.log(error);
        }
    } 

    const navigateToHome = function() {
        navigate('/', {replace:true});
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

            {/* Login Up Card */}
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
                        helperText={emailErrorText}
                        onTextChange = {onEmailChange}
                        disabled={disableAllInputs}
                    />
                    <InputField 
                        className="input-field"
                        variant = "outlined"
                        label="Password"
                        type="password"
                        isError={isPasswordError}
                        helperText={passwordErrorText}
                        onTextChange = {onPasswordChange}
                        disabled={disableAllInputs}
                    />
                </div>
                <br/>

                {/* Login Button */}
                <div className="btn-container">
                    <MyButton 
                        btnText={signupText[signupTextIndex]}
                        variant="primary"
                        size="lg"
                        btnDisabled={disableAllInputs}
                        handleClick = {handleSignUpClick}
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
                        className={`firebase-img-btn${disableAllInputs?' disabled':''}`} 
                        onClick={!disableAllInputs?signInWithGoogleRedirect:null} 
                        src={GoogleIcon} 
                        alt="google" />
                    <img 
                        onClick={!disableAllInputs?handleFacebookAuth:null}
                        className={`firebase-img-btn${disableAllInputs?' disabled':''}`} 
                        src={FacebookIcon} 
                        alt="facebook" />
                </div>
            </Card>

        </div>
    );
}

export default LoginPage;