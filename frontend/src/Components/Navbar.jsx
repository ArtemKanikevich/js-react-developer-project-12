import React, { useEffect } from 'react';
import { Navbar, ButtonGroup, ToggleButton, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import  leoProf  from "leo-profanity";
//import { FlaticonIcon } from '@flaticon/flaticon-uicons';
import '@flaticon/flaticon-uicons/css/all/all.css';

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

    return (
      <>   
      <Navbar expand="sm" bg="light" className="bg-body-tertiary" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Slack Chat</Navbar.Brand>            
                 
          <LngButtons/>                    
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