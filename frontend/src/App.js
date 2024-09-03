import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LogInForm } from "./Components/Login.jsx";
import { Singup } from "./Components/Singup.jsx";
import  PageNotFound from "./Components/PageNotFound.jsx";
import { MainPage } from "./Components/MainPage.jsx";
import  NavbarContainer  from "./Components/Navbar.jsx";
import { setLogIn, removeLogIn } from './Slices/autorizSlice.js';


/*<Route path="/" element={(
  <PrivateRoute>
  <MainForm />
</PrivateRoute>
)}/> */

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
  );
}

export default App;
 