import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Slices/index.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from'./i18n/i18n.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    
    <Provider store={store}>      
      <App />   
    </Provider>

 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
