import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.styles.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../button/button.component';
import { isLoggedInSelector } from '../../store/selectors/user';
import { userStateAtom } from '../../store/atoms/user';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userTokenLCKey, userEmailLCKey } from '../../utils/constants';

const actionBtnTextArr = ["Login", "Sign Up", "Logout"];
const actionBtnLinkPath = ["/login", "/signup", "/"];

function NavBar() {
    const navigate = useNavigate();
    const userStateReset = useResetRecoilState(userStateAtom);
    const [isLogin, setIsLogin] = useState(false);
    const isUserLoggedIn = useRecoilValue(isLoggedInSelector);
    const [actionButtonIndex, setActionButtonIndex] = useState(0);

    // Handle navbar button text
    useEffect(() => {
      if(isUserLoggedIn) { 
        setActionButtonIndex(2);
      }
      else {
        if(isLogin){
            setActionButtonIndex(1);
        }
        else {
            setActionButtonIndex(0);
        }
      }
    },[isLogin, isUserLoggedIn]);



    
    const [navBarCollapse, setNavbarCollapse] = useState(true);

    function handleActionButtonClick() {
        if(isUserLoggedIn) {
            handleLogout();
        }
        else {
            if(isLogin){
                setActionButtonIndex(1);
            }
            else {
                
                setActionButtonIndex(0);
            }
            setIsLogin(!isLogin);
            setNavbarCollapse(true);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem(userEmailLCKey);
        localStorage.removeItem(userTokenLCKey);
        setIsLogin(false);
        userStateReset();
        console.log("User Logout successful!");
    }

    const navigateToLink = (path) => {
        navigate(path);
    }
    function handleToggle(event) {
        console.log(event);
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand='lg' className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className="navbar-text" href="#" onClick={()=>{
                    navigateToLink('/');
                }}>Coursera</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        <Nav.Link className="navbar-text" eventkey="1">Home</Nav.Link>
                        <Nav.Link className="navbar-text" eventkey="2">Link</Nav.Link>
                    </Nav>
                
                    <Nav.Link className="navbar-link-btn" eventkey="3">
                        <Link 
                            eventkey="1"
                            className='btn-link'
                            to={actionBtnLinkPath[actionButtonIndex]}>
                            <MyButton 
                                btnText={actionBtnTextArr[actionButtonIndex]}
                                variant="primary"
                                size="lg"
                                handleClick={handleActionButtonClick}/>
                        </Link>
                    </Nav.Link>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;