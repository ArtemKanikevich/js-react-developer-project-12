import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navbar, ButtonGroup, ToggleButton, Container, Button, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import  leoProf  from "leo-profanity";
//import { FlaticonIcon } from '@flaticon/flaticon-uicons';
import '@flaticon/flaticon-uicons/css/all/all.css';
import mobileAdapter from "../mobileAdapter.js";
import Channels from "./Channels.jsx";


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

  const [forMobile, setForMobile] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const { unRead } = useSelector((state) => state.channels);
  const { logIn } = useSelector((state) => state.auth);


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

    return (
      <>   
      <Navbar expand="sm" bg="light" className="bg-body-tertiary" data-bs-theme="light">
        <Container>
          <div className="brand__container">
            <Navbar.Brand href="/">Slack Chat</Navbar.Brand>
            { forMobile && logIn &&
            <div className="icon__container">                   
             <a onClick = {openOffCanvas} href="#"className='navbar__icons'>       
                <i className= "fi fi-sr-menu-burger icon_size"></i>
              </a>
            </div>
            }
            { forMobile && logIn &&
            <div className="icon__container">
              {unRead.length > 0 && <i className="fi fi-rr-comment message__icons"></i>}
            </div>  
            }
            
          </div>
          <LngButtons/>                    
        </Container>
      </Navbar>

    
      <Offcanvas show={showOffCanvas} onHide={closeOffCanvas} className="custom-offcanvas"> 
         <Channels inOffCanvas = {showOffCanvas} hideOffCanvas = {closeOffCanvas}/>
      </Offcanvas>
     
      <br />
      </>
    );
  }
  
  export default NavbarContainer;
  export const leoFilter = leoProf;

  //<Button variant="secondary" size="sm">
  //<Navbar.Collapse className="justify-content-end"></Navbar.Collapse>

 /* 
 <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`}/> 
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
                 
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Offcanvas
                </Offcanvas.Title>
            </Offcanvas.Header>
          </Navbar.Offcanvas>     
*/