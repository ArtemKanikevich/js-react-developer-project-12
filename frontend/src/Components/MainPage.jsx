import React, {useEffect} from 'react';
import { setLogIn, removeLogIn } from '../Slices/autorizSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../logo.svg';

export const MainForm = () => {
  const dispatch = useDispatch(); 

  //LogIn Reset
  useEffect(() => {
   // localStorage.clear("userId");  
    console.log(`localStorage: `,localStorage);
    //dispatch(removeLogIn());
  });
  
   return (
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
    </div> 
   )
}   