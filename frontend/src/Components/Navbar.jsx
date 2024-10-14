import React, { useEffect } from 'react';
import { Navbar, ButtonGroup, ToggleButton, Container, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import  leoProf  from "leo-profanity";
//import { FlaticonIcon } from '@flaticon/flaticon-uicons';
import '@flaticon/flaticon-uicons/css/all/all.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChannel } from "../Slices/channelsSlice.js";
import { removeLogIn } from "../Slices/autorizSlice.js";
import initialSt from "../initialSt.js";
import Channels from "./Channels.jsx";
import mobileAdapter from "../mobileAdapter.js";


function LngButtons() { 
  const { i18n } = useTranslation();
  //i18n.changeLanguage("ru");
  const [radioValue, setRadioValue] = useState('ru');

  useEffect(() => {
    leoProf.loadDictionary("ru");
  },[]);  

  const radios = [
    { name: 'en', value: 'en' },
    { name: 'ру', value: 'ru' },    
  ];

  return (
    <ButtonGroup> 
        {radios.map((radio, idx) => (
          <ToggleButton
            size="sm"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant='outline-success'
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              i18n.changeLanguage(e.currentTarget.value);
              leoProf.loadDictionary(e.currentTarget.value);
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
  );
}  


const NavbarContainer = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forMobile, setForMobile] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const logIn = useSelector((state) => state.auth.logIn);
  const { unRead } = useSelector((state) => state.channels);

  const openOffCanvas = () => {
    setShowOffCanvas(true);
   }
   
   const closeOffCanvas = () => {
    setShowOffCanvas(false); 
   }
     
   useEffect(() => {    
     const resizeReset = mobileAdapter(setForMobile);
    //console.log("mobile ", forMobile);
     return resizeReset;
   },[]);  

  const exitClick = () => {
    localStorage.clear();
    dispatch(removeLogIn());
    dispatch(setCurrentChannel(initialSt.currentCh));
    navigate("/");
  }

    return (
      <>   
      <Navbar expand="sm" className="bg_stile" >
        <Container>
          <div className="brand-container">
            <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>  
            { forMobile && logIn &&
              <div className="brand-container__icon">                   
               <a onClick = {openOffCanvas} href="#"className='icon-link'>       
                <i className= "fi fi-sr-menu-burger icon-menu"></i>
               </a>
              </div>
            } 
            { forMobile && logIn &&
              <div className="brand-container__icon">
               {unRead.length > 0 && <i className="fi fi-rr-comment message-icon"></i>}
              </div>  
            }             
          </div>         
        
          <div className='navbar-container'>      
            { logIn && 
            <div className='navbar-container__icon'>                   
            <a onClick = {exitClick} href="#"className='icon-link'><i    className="fi fi-rr-exit icon-home"></i></a> 
            </div> 
            }
            <LngButtons/>   
          </div>              

        </Container>
      </Navbar>

      <Offcanvas show={showOffCanvas} onHide={closeOffCanvas}  className="custom-offcanvas"> 
         <Channels inOffCanvas = {true} hideOffCanvas = {closeOffCanvas}/>
      </Offcanvas>

      <br />
      </>
    );
  }
  
  export default NavbarContainer;
  export const leoFilter = leoProf;

  //<Button variant="secondary" size="sm">
  //<Navbar.Collapse className="justify-content-end"></Navbar.Collapse>