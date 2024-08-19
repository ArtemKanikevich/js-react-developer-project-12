import React from 'react';
import { Navbar, ButtonGroup, ToggleButton, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


function LngButtons() { 
  const { t, i18n } = useTranslation();
  //i18n.changeLanguage("ru");
  const [radioValue, setRadioValue] = useState('en');

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
          <Navbar.Brand href="#">Slack Chat</Navbar.Brand>           
          <LngButtons/>                
        </Container>
      </Navbar>
      <br />
      </>
    );
  }
  
  export default NavbarContainer;