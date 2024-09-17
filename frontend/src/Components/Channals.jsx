import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, ListGroup, Dropdown, ButtonGroup, Row, Col, Card, Form, Button, Modal, DropdownButton, InputGroup}  from 'react-bootstrap';
import * as yup from 'yup';
import { setCurrentChannel } from "../Slices/channelsSlice.js";
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";

import ModalRemChannel from "./ModalRemChannel.jsx";
import ModalNewChannel from "./ModalNewChannel.jsx";


const Channals = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [ModalCh, setModalCh] = useState({show: false, id: "0", newCh: "false"});
    const [ModalRemCh, setModalRemCh] = useState({show: false, id: "0"});
   // const [ModalRenCh, setModalRenCh] = useState({show: false, id: 0});
    const { data, currentCh } = useSelector((state) => state.channels);

   //change channel
    const handleClick = (e) => {
       // console.dir(e.target.dataset.asId);
        dispatch(setCurrentChannel(e.target.dataset.asId));
    }  

    const showModal = (eventKey, id) => {
      if (eventKey ==="1") setModalCh({show: true, id, newCh: "false"});
      if (eventKey ==="2") setModalRemCh({show: true, id});
    };      

    return(
      data != undefined ? (  
       <div className="branches branches__container">

        <div className="branches__title">
            {t('channels')}
            <Button onClick ={() => setModalCh({show: true, newCh: "true"})} variant="success" size="sm">+</Button>
        </div>

        {data.map(elem => (                 
          elem.removable ? (
          <Dropdown as={ButtonGroup} key = {`channal-${elem.id}`}
          onSelect = {(eventKey, e) => showModal(eventKey, elem.id)}>
              <Button onClick = {handleClick}  variant={currentCh === elem.id ? "success": "outline-secondary"} data-as-id = {elem.id}>{elem.name}</Button>
              <Dropdown.Toggle split  variant={currentCh === elem.id ? "success": "outline-secondary"} id={`dropdown-split-${elem.id}`}/> 
              <Dropdown.Menu>
                <Dropdown.Item eventKey ="1">{t("rename")}</Dropdown.Item>
                <Dropdown.Item eventKey ="2">{t("remove")}</Dropdown.Item>                
              </Dropdown.Menu>
          </Dropdown>
          ):
           <Button key = {`channal-${elem.id}`} onClick = {handleClick} variant={currentCh === elem.id ? "success": "outline-secondary"} data-as-id = {elem.id}>{elem.name}</Button>
        ))}               
      
        {ModalCh.show ? (
          <ModalNewChannel
          show={ModalCh.show}
          onHide={() => setModalCh({show: false, newCh: "false", id: "0"})}
          isitnewch = {ModalCh.newCh}
          idch = {ModalCh.id}
          allchannels = {data}/> )    
         : null }

         {ModalRemCh.show ? (
          <ModalRemChannel
          show={ModalRemCh.show}
          onHide={() => setModalRemCh({show: false, id: "0"})}
          chid = {ModalRemCh.id}/> )    
         : null } 
        
      </div> 
      ): null 
    )
}


export default Channals;

/* list with channals!!!
<div className="branches__list">
<ListGroup variant="flush">
  {data.map(elem => (               
     <ListGroup.Item onClick = {handleClick} key = {`channal-${elem.id}`} variant="success" action data-as-id = {elem.id}            
     >{elem.name}</ListGroup.Item>
  ))}           
</ListGroup>
</div> 

{ModalNewCh ? (
  <ModalNewChannel
  show={ModalNewCh}
  onHide={() => setModalNewCh(false)}
  allchannels = {data}/> )    
 : null }
 */