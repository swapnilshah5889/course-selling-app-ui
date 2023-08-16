import { useEffect } from 'react'
import './App.css'
import SignUp from './pages/sign-up/sign-up.page'
import NavBar from './components/navbar/navbar.component'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page'
import { userTokenLCKey, userEmailLCKey } from './utils/constants'
import {
  useSetRecoilState,
} from 'recoil';
import { userStateAtom } from './store/atoms/user'

function App() {

  const setUserState = useSetRecoilState(userStateAtom);

  // On url path change
  useEffect(() => {
    
    if(localStorage.getItem(userTokenLCKey)) {
      setUserLoggedIn();
    }

    console.log(window.location.pathname);
  }, [window.location.pathname])

  // Set User Logged In - Recoil State
  const setUserLoggedIn = function() {
    try {
        setUserState({
          isLoggedIn : true,
          userEmail : localStorage.getItem(userEmailLCKey),
          token : localStorage.getItem(userTokenLCKey)
        });

        
    } catch (error) {
        console.log(error);
    }
  } 


  return (
    <Router>
      <div>

        <NavBar />
        
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
