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

import ModalRemChannel from "./ModalNewChannel.jsx";


const ModalNewCh = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allchannels } = props;
  const token = localStorage.getItem("userIdToken"); 
  //get names from allchannels
  const namesCh = allchannels.map(elem => elem.name);
  console.log(namesCh); 

  const schema = yup.object().shape({
    newChannel: yup.string().trim().min(3, t('channel_message_1')).
    max(20, t('channel_message_2')).required(t('channel_message_3')).notOneOf(namesCh, t('channel_message_4')),      
  });    

  const formik = useFormik({
    initialValues: {
      newChannel: '', 
    },
    validationSchema: schema,    
    onSubmit: (values) => {createNewCh(values.newChannel)}       
  });       

  const createNewCh = async (text) =>{          
    //         
    try {
      const response = await axios.post(paths.channelsPath(), {name: text}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`New channel was sent `, response.data); 
      // reset input
      //inputRef.current.value = ''
      formik.values.newChannel = "";
      //remove modal
      props.onHide();
      // set current Ch
      dispatch(setCurrentChannel(response.data.id));
         
    } catch (err) {
      console.error(err);
      store.dispatch(setChannelsError(err.response ? err.response.statusText +`. `+err.message : err.message));
      throw err;
    }
  };  
   

  return (
    <Modal
    {...props}   
    aria-labelledby="contained-modal-title-vcenter"
    centered >
      <Form onSubmit = {formik.handleSubmit}>   

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("addChannel")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>           
        <Form.Control 
        // className="me-auto"
         name="newChannel"
         type="text"            
         onChange={formik.handleChange}
         value={formik.values.newChannel}            
         aria-describedby="newChannel"
         className = {formik.touched.newChannel && formik.errors.newChannel ? "is-invalid" : null}
         autoFocus                  
         />
          {(formik.touched.newChannel && formik.errors.newChannel) ? 
          <Form.Text id="newChanneleBlock" muted>
            {formik.errors.newChannel}
          </Form.Text> : null}              
       </Modal.Body>  

        <Modal.Footer>       
          <Button variant="secondary" onClick={props.onHide}>{t("cancel")}</Button>
          <Button variant="success" type="submit">{t("sent")}</Button>          
        </Modal.Footer>   

        </Form>  
    </Modal>
  )
}


const Channals = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showModalNewCh, setModalNewCh] = useState(false);
    const [showModalRemCh, setModalRemCh] = useState({show: false, id: 0});
    const { data, currentCh } = useSelector((state) => state.channels);

   //change channel
    const handleClick = (e) => {
       // console.dir(e.target.dataset.asId);
        dispatch(setCurrentChannel(e.target.dataset.asId));
    }  

   // const dropDownClick = (eventKey, id) => {

   // }   
   

    return(
      data != undefined ? (  
       <div className="branches branches__container">

        <div className="branches__title">
            {t('channels')}
            <Button onClick ={() => setModalNewCh(true)} variant="success" size="sm">+</Button>
        </div>

        {data.map(elem => (                 
          elem.removable ? (
          <Dropdown as={ButtonGroup} key = {`channal-${elem.id}`}
          onSelect = {(eventKey, e) => setModalRemCh({show: true, id: elem.id})}>
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
      
        {showModalNewCh ? (
          <ModalNewCh
          show={showModalNewCh}
          onHide={() => setModalNewCh(false)}
          allchannels = {data}/> )    
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
</div> */