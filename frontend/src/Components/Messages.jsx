import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, Row, Col, Card, Form, Button, Stack, InputGroup}  from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash' ;
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import { removeLogIn } from "../Slices/autorizSlice.js";
import paths from "../routes.js";

const Messages = () => {
   // const [text, setText] = useState("");
    const { t } = useTranslation();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const messagesArr = useSelector((state) => state.messages.data);
    const { currentCh } = useSelector((state) => state.channels);   
    const channelsArr =  useSelector((state) => state.channels.data);   
    const token = localStorage.getItem("userIdToken");   
    const userName =  localStorage.getItem("userIdName");
    

    const sendMessage = async (text) =>{          
        const newMessage = { body: text, channelId: currentCh, username: userName }; //         
        try {
          const response = await axios.post(paths.messagesPath(), newMessage, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(`New message was sent `, response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
          // reset input
          inputRef.current.value = ''
          formik.values.message = "";
             
        } catch (err) {
          console.error(err);
          store.dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
          throw err;
        }
    };

    const exitClick = () => {
      localStorage.clear();
      dispatch(removeLogIn());
      navigate("/");
    }

    const formik = useFormik({
      initialValues: {
        message: '', 
      },    
      onSubmit: (values) => {sendMessage(values.message)}       
      });      

     // <Form.Group className="mb-3" controlId="formBasicText">

    return (
    //пропускаем перв. рендер  
    messagesArr != undefined ? (  
    <div className="messages messages__container">        
       <div className="messages__active-chanal">                
          <div className="messages__active-chanal-name">
           <b>{channelsArr.find (elem => elem.id === currentCh).name}</b><br/>N 
          </div>
          <div>                   
           <a onClick = {exitClick} href="#"className='navbar__icons'><i className="fi fi-rr-exit icon_home"></i></a> 
          </div>
       </div>

       <div className="messages__list">
        <ul className="messages__ul">
          { messagesArr.map(elem => (
            elem.channelId === currentCh ? (
            <li key = {uniqueId()}><b>{elem.username}:</b> {elem.body}</li>) : null)
          )}           
         </ul>
       </div>

       <div className="message__input">
        <Form 
         onSubmit = {formik.handleSubmit}>         
         <InputGroup className="mb-3">
          <Form.Control 
           className="me-auto"
           name="message"
           type="text" 
           placeholder= {t('newMessage')} 
           onChange={formik.handleChange}
           value={formik.values.message}  
           aria-label="New message" 
           aria-describedby="message"
           ref={inputRef}        
           />                 
         
         <Button variant="success" type="submit" id="button-addon2">
           {t('sent')}
         </Button>
         </InputGroup>        
        </Form>  
       </div>        
    </div>          
    ): null   
  );  
}

export default Messages;

//

//