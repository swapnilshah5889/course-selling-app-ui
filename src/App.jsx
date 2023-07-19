import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './pages/sign-up/sign-up.page'
import NavBar from './components/navbar/navbar.component'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page'

const actionBtnTextArr = ["Login", "Sign Up", "Logout"];
const actionBtnLinkPath = ["/login", "/signup", "/logout"];
function App() {
  
  const [navbarActionIndex, setNavbarActionIndex] = useState(0);

  useEffect(() => {
    if(window.location.pathname == "/login") {
      setNavbarActionIndex(1);
    }
    else if(window.location.pathname == "/signup") {
      setNavbarActionIndex(0);
    }
  }, [window.location.pathname])

  const handleNavbarActionButtonClick = (index) => {
    setNavbarActionIndex(index);
    if(index == 0) {
      
    }
    else {

    }
  }

  return (
    <Router>
      <div>

        <NavBar
          actionBtnClick = {handleNavbarActionButtonClick}
          actionButtonText={actionBtnTextArr[navbarActionIndex]}
          isSignup = {false}
          actionBtnLinkPath={actionBtnLinkPath[navbarActionIndex]}
        />
      
        <Routes >  
            <Route index element={ <HomePage /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/login' element={ <LoginPage /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
