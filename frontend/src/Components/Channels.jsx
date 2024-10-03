import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";

import  {Container, ListGroup, Dropdown, ButtonGroup, Row, Col, Card, Form, Button, }  from 'react-bootstrap';
//import 'react-toastify/dist/ReactToastify.css';

import { setCurrentChannel, removeFromUnRead } from "../Slices/channelsSlice.js";
import ModalRemChannel from "./ModalRemChannel.jsx";
import ModalChannel from "./ModalChannel.jsx";


const Channals = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [ModalCh, setModalCh] = useState({show: false, id: "0", newCh: "false"});
    const [ModalRemCh, setModalRemCh] = useState({show: false, id: "0"});
   // const [ModalRenCh, setModalRenCh] = useState({show: false, id: 0});
    const { data, currentCh, unRead } = useSelector((state) => state.channels);
    const { inOffCanvas, hideOffCanvas } = props;

    //for mobile Class
    let classNameCont = "";
    if (inOffCanvas) classNameCont = "container-mobile branches branches__container";
    else classNameCont = "branches branches__container";  

   //change channel
    const handleClick = (e) => {
        dispatch(setCurrentChannel(e.target.dataset.asId));
        dispatch(removeFromUnRead(e.target.dataset.asId));
        if (inOffCanvas) hideOffCanvas();
    }  

    const showModal = (eventKey, id) => {
      if (eventKey ==="1") setModalCh({show: true, id, newCh: "false"});
      if (eventKey ==="2") setModalRemCh({show: true, id});
    }; 
    
    //save unRead to storage
    useEffect (() => {
      localStorage.setItem('unRead', JSON.stringify(unRead));
    });

    return(
      data != undefined ? (  
       <div className={ classNameCont }>

        <div className="branches__title">
            {t('channels')}
            <Button onClick ={() => setModalCh({show: true, newCh: "true"})} variant="success" size="sm">+</Button>
        </div>

        <div className="branches__list">
         {data.map(elem => (                 
          elem.removable ? (
          <Dropdown as={ButtonGroup} key = {`channal-${elem.id}`}
          onSelect = {(eventKey, e) => showModal(eventKey, elem.id)} className="branches__toggle">

              <Button  className="w-100 text-start button__channel"
              onClick = {handleClick}  variant={currentCh === elem.id ? "success": "light"} data-as-id = {elem.id}>{`# ${elem.name} `} 

              {unRead.find(chId => chId === elem.id) && (
              <i className="fi fi-rr-comment message__icons_sm"></i>)}
              </Button>

              <Dropdown.Toggle className="button__channel" split  variant={currentCh === elem.id ? "success": "light"} id={`dropdown-split-${elem.id}`}/> 
              <Dropdown.Menu>
                <Dropdown.Item eventKey ="1">{t("rename")}</Dropdown.Item>
                <Dropdown.Item eventKey ="2">{t("remove")}</Dropdown.Item>                
              </Dropdown.Menu>
          </Dropdown>
          ):
           <Button className="w-100 text-start button__channel"
           key = {`channal-${elem.id}`} onClick = {handleClick} variant={currentCh === elem.id ? "success": "light"} data-as-id = {elem.id}>{`# ${elem.name} `} 

           {unRead.find(chId => chId === elem.id) && (
            <i className="fi fi-rr-comment message__icons_sm"></i>)}          
           </Button>
        ))}
        </div>

        {ModalCh.show ? (
          <ModalChannel
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

/* 
<i className="fi fi-rr-comment message__icons_sm"></i>

list with channals!!!
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