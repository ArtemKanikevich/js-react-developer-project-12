import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import  {Form, Button, Modal}  from 'react-bootstrap';

import {setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import paths from "../routes.js";


const ModalRemChannel = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { allchannels } = props;

    const token = localStorage.getItem("userIdToken"); 
    //const [error, setError] = useState(false);
      
    //remove Channel
    const remCh = async (text) =>{          
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
           
  
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {t("remove")}" "{t("channel")}
            </Modal.Title>
          </Modal.Header>
  
           <Modal.Body>           
              Are you sure ?        
           </Modal.Body>  
  
            <Modal.Footer>       
              <Button variant="secondary" onClick={props.onHide}>{t("cancel")}</Button>
              <Button variant="success">{t("remove")}</Button>          
            </Modal.Footer>     
            
        </Modal>
     
    )
  }

  export default ModalRemChannel;