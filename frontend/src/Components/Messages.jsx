import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import axios from "axios";
import { useFormik } from 'formik';
import  {Container, Row, Col, Card, Form, Button}  from 'react-bootstrap';
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
//import paths from "../routes.js";

const Messages = ({sendMessage}) => {
   // const [text, setText] = useState("");
   const formik = useFormik({
    initialValues: {
      message: '', 
    },    
    onSubmit: values => {sendMessage(values.message)}       
    });

    return (
       <Form 
         onSubmit = {formik.handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control 
           name="message"
           type="text" 
           placeholder="New message" 
           onChange={formik.handleChange}
           value={formik.values.message}
           />                     
         </Form.Group>
         <Button variant="success" type="submit">
           Sent
         </Button>
       </Form>  
    );  
}

export default Messages;