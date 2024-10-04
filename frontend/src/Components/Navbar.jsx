import React, { useEffect } from 'react';
import { Navbar, ButtonGroup, ToggleButton, Container, Button } from 'react-bootstrap';
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


function LngButtons() { 
  const { t, i18n } = useTranslation();
  //i18n.changeLanguage("ru");
  const [radioValue, setRadioValue] = useState('ru');

  useEffect(() => {
    leoProf.loadDictionary("ru");
  },[]);  

  const radios = [
    { name: t('leng_en'), value: 'en' },
    { name: t('leng_ru'), value: 'ru' },    
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
  const logIn = useSelector((state) => state.auth.logIn);

  const exitClick = () => {
    localStorage.clear();
    dispatch(removeLogIn());
    dispatch(setCurrentChannel(initialSt.currentCh));
    navigate("/");
  }

    return (
      <>   
      <Navbar expand="sm" bg="light" className="bg-body-tertiary" data-bs-theme="light">
        <Container>
          <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>            

        <div className='navbar__container'>      
          { logIn && <div>                   
           <a onClick = {exitClick} href="#"className='icons navbar__icons-item'><i className="fi fi-rr-exit icon_home"></i></a> 
          </div> 
          }
          <LngButtons/>   
        </div>               

        </Container>
      </Navbar>
      <br />
      </>
    );
  }
  
  export default NavbarContainer;
  export const leoFilter = leoProf;

  //<Button variant="secondary" size="sm">
  //<Navbar.Collapse className="justify-content-end"></Navbar.Collapse>