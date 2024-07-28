import './App.css';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LogInForm } from "./Components/Login.jsx";
import  PageNotFound from "./Components/PageNotFound.jsx";
import { MainForm } from "./Components/MainPage.jsx";
import  NavbarContainer  from "./Components/Navbar.jsx";

import { useSelector, useDispatch } from 'react-redux';

/*<Route path="/" element={(
  <PrivateRoute>
  <MainForm />
</PrivateRoute>
)}/> */

function App() {
  const logIn = useSelector((state) => state.auth.logIn);
  console.log(`logIn: `,logIn);

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
              <Route path='/' element={<MainForm/>} />
              
        </Route>
        <Route path="/login" element={ logIn ? <Navigate to="/"/> : <LogInForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 