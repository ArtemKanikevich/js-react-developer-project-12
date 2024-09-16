import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import  {Form, Button, Modal}  from 'react-bootstrap';

import {setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import paths from "../routes.js";


const ModalNewChannel = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { allchannels } = props;
    const token = localStorage.getItem("userIdToken"); 
    //const [error, setError] = useState(false);
  
    //get names from allchannels
    const namesCh = allchannels.map(elem => elem.name);
  
    const schema = yup.object().shape({
      newChannel: yup.string().trim().min(3, t('channel_message_1')).
      max(20, t('channel_message_2')).required(t('channel_message_3')).notOneOf(namesCh, t('channel_message_4')),      
    });    
  
    //new Channel
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
  
    const formik = useFormik({
      initialValues: {
        newChannel: "", 
      },    
      validationSchema: schema,
      onSubmit: (values) => {createNewCh(values.newChannel)}
        
    });      
    
  
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

  export default ModalNewChannel;