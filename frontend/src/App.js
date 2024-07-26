import './App.css';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LogInForm } from "./Components/Login.jsx";
import  PageNotFound from "./Components/PageNotFound.jsx";
import { MainForm } from "./Components/MainPage.jsx";
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
      <Routes>        
        <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<MainForm/>} />
              
        </Route>
        <Route path="/login" element={ logIn ? <Navigate to="/"/> : <LogInForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>      
    </div> */
  );
}

export default App;
 