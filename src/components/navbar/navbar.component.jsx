import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/button.component';

function NavBar(props) {
    const {
        actionButtonText, 
        actionBtnClick, 
        isSignup, 
        actionBtnLinkPath} = props;
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(isSignup);
    const [navBarCollapse, setNavbarCollapse] = useState(true);
    function handleActionButtonClick(event) {
        if(isUserLoggedIn) {
            actionBtnClick(2);
        }
        else {
            if(isSignUp){
                actionBtnClick(0);
            }
            else {
                actionBtnClick(1);
            }
            setIsSignUp(!isSignUp);
            setNavbarCollapse(true);
        }
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
                        <Nav.Link className="navbar-text" eventKey="1">Home</Nav.Link>
                        <Nav.Link className="navbar-text" eventKey="2">Link</Nav.Link>
                    </Nav>
                
                    <Nav.Link className="navbar-link-btn" eventKey="3">
                        <Link 
                            eventKey="1"
                            className='btn-link'
                            to={actionBtnLinkPath}>
                            <MyButton 
                                btnText={actionButtonText}
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