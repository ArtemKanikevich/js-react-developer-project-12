import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, Row, Col, Card, Form, Button, Spinner, InputGroup}  from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash' ;
import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import { removeLogIn } from "../Slices/autorizSlice.js";
import paths from "../routes.js";
import {getAmount, insertMessages} from "../addmessages.js";


const Messages = () => {
   // const [text, setText] = useState("");
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //spiner
    const[loading, setLoading] = useState(true);

    const messagesArr = useSelector((state) => state.messages.data);
    const { currentCh } = useSelector((state) => state.channels);   
    const channelsArr =  useSelector((state) => state.channels.data);   
    const token = localStorage.getItem("userIdToken");   
    const userName =  localStorage.getItem("userIdName");

    useEffect(() => {
      if (inputRef.current) {       
        inputRef.current.focus(); // Устанавливаем фокус
      }
      setTimeout(() => setLoading(false), 500);      
      if (listRef.current)
        listRef.current.scrollTop = listRef.current.scrollHeight;

      return () => {
        // Эта логика выполнится только при размонтировании компонента
        console.log("Messages page unmount");
        setLoading(true);
      };
    }, [messagesArr, currentCh, channelsArr]);    


      const sendMessage = async (text) =>{          
        const newMessage = { body: text, channelId: currentCh, username: userName }; //         
        try {
          const response = await axios.post(paths.messagesPath(), newMessage, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(`New message was sent `, response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
          return true;          
             
        } catch (err) {
          console.error(err);
          dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
          return false;
        //  throw err;
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
      onSubmit: (values) => {
        //insert N auto messages. Type: "/insert-N"
        if (getAmount(values.message)) {
          insertMessages(getAmount(values.message), currentCh, userName, token, setLoading);
         // console.log (pr);
        } 
        //normal sending 
        else if (sendMessage(values.message)) {
          // reset input
         // inputRef.current.value = ''
          formik.values.message = "";
        }
      }       
    });      

     // <Form.Group className="mb-3" controlId="formBasicText">

    return (
    //пропускаем перв. рендер  
    messagesArr != undefined ? (  
    <div className="messages messages__container">        
       <div className="messages__active-chanal">                
          <div className="messages__active-chanal-name">
           <b># {channelsArr.find (elem => elem.id === currentCh).name}</b><br/>
           {messagesArr.reduce((acc,cur)=> cur.channelId === currentCh ? acc + 1 : acc, 0)}
          </div>

          {loading &&
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner> }
          
          <div>                   
           <a onClick = {exitClick} href="#"className='navbar__icons'><i className="fi fi-rr-exit icon_home"></i></a> 
          </div>
       </div>

       <div ref={listRef} className="messages__list">
        <ul  className="messages__ul">
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