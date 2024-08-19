import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, Row, Col, Card, Form, Button, Stack, InputGroup}  from 'react-bootstrap';
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";

const Messages = () => {
   // const [text, setText] = useState("");
   
    const sendMessage = async (text) =>{  
        const token = localStorage.getItem("userIdToken");   
        const userName =  localStorage.getItem("userIdName");
        const newMessage = { body: text, channelId: '1', username: userName }; // admin!!!!
        
        try {
          const response = await axios.post(paths.messagesPath(), newMessage, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(`New message was sent `, response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
             
        } catch (err) {
          console.error(err);
          store.dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
          throw err;
        }
    };

    const formik = useFormik({
      initialValues: {
        message: '', 
      },    
      onSubmit: (values) => {sendMessage(values.message)}       
      });      

     // <Form.Group className="mb-3" controlId="formBasicText">

    return (
      
      <div className="messages messages__container">        
       <div className="messages__active-chanal">        
        
          <p>Text<br/>N</p>          
       
       </div>

       <ul className="messages__list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>

       <div className="message__input">
       <Form 
         onSubmit = {formik.handleSubmit}>
         
         <InputGroup className="mb-3">
          <Form.Control 
           className="me-auto"
           name="message"
           type="text" 
           placeholder="New message" 
           onChange={formik.handleChange}
           value={formik.values.message}  
           aria-label="New message" 
           aria-describedby="basic-addon2"        
           />                     
         
         <Button variant="success" type="submit" id="button-addon2">
           Sent
         </Button>
         </InputGroup>        
       </Form>  
      </div>        
     </div>          
      
    );  
}

export default Messages;