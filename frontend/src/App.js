import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';

import store from './Slices/index.js';
import { LogInForm } from "./Components/Login.jsx";
import { Singup } from "./Components/Singup.jsx";
import  PageNotFound from "./Components/PageNotFound.jsx";
import { MainPage } from "./Components/MainPage.jsx";
import  NavbarContainer  from "./Components/Navbar.jsx";
//import { setLogIn, removeLogIn } from './Slices/autorizSlice.js';

/*<Route path="/" element={(
  <PrivateRoute>
  <MainForm />
</PrivateRoute>
)}/> */
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
 // accessToken: 'f8272ad6c650422d986a5b04161fb605',
 // environment: 'production',
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};


function App() {

  const dispatch = useDispatch();
 /* 
  useEffect(() => {
    if (localStorage.getItem('userIdToken'))
      dispatch(setLogIn());
    
  },[]) */

  const logIn = useSelector((state) => state.auth.logIn);
  //console.log(`logIn: `,logIn);
  //const logIn = false;
  const PrivateRoutes = () => {    
     return (
       localStorage.getItem('userIdToken') ? <Outlet/> : <Navigate to="/login"/>
     );
  };
  //if (logIn) <Navigate to="/"/>; 

  return (
   <Provider config={rollbarConfig}>
     <ErrorBoundary>

    <BrowserRouter>
     <NavbarContainer/>
      <Routes>        
        <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<MainPage/>} />              
        </Route>
        <Route path="/login" element={ logIn ? <Navigate to="/"/> : <LogInForm />} />
        <Route path="/singup" element={<Singup/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

    </ErrorBoundary>
  </Provider>
 
  );
}

export default App;
 