import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.styles.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/button.component';
import { userStateAtom } from '../../store/atoms/user';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userTokenLCKey, userEmailLCKey } from '../../utils/constants';

const actionBtnTextArr = ["Login", "Sign Up", "Logout"];
const actionBtnLinkPath = ["/login", "/signup", "/"];

function NavBar(props) {
    const userStateReset = useResetRecoilState(userStateAtom);
    const [isLogin, setIsLogin] = useState(false);
    const userState = useRecoilValue(userStateAtom);
    const [actionButtonIndex, setActionButtonIndex] = useState(0);

    // Handle navbar button text
    useEffect(() => {
      if(userState.isLoggedIn) { 
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
    },[isLogin, userState]);



    
    const [navBarCollapse, setNavbarCollapse] = useState(true);

    function handleActionButtonClick(event) {
        if(userState.isLoggedIn) {
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

    function handleToggle(event) {
        console.log(event);
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand='lg' className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className="navbar-text" href="#">Coursera</Navbar.Brand>
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