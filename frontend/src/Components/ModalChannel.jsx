import axios from "axios";
import { useFormik } from 'formik';
import React, { useEffect, useRef } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import paths from "../routes.js";
import { leoFilter } from "./Navbar.jsx";
import toastObj from "../toastObj.js";


const ModalNewChannel = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const btnSubmitRef = useRef(null);
  const btnCancelRef = useRef(null);
  const { allchannels, isitnewch, idch } = props;
  const token = localStorage.getItem("userIdToken"); 
  //get names from allchannels
  const namesCh = allchannels.map(elem => elem.name);
  let activeNameCh = "";
  let title = "";

  useEffect(() => {
    if (inputRef.current) {
     // console.log(inputRef.current);
      inputRef.current.focus(); // Устанавливаем фокус
      inputRef.current.select(); // Выделяем текст
    }
  }, []);

  //check for rename
  if (isitnewch === 'false') {
    activeNameCh = allchannels.find(elem => elem.id === idch).name;  
    title = t("rename")+" "+ t("channel");}
  if (isitnewch === 'true')  {
    title = t("add")+" "+ t("channel");
  }
  //console.log("activeNameCh :", activeNameCh);
  //console.log("isitnewch :", isitnewch);
  //console.log("idch :", idch);  

  const schema = yup.object().shape({
    newChannel: yup.string().trim().min(3, t('channel_message_1')).
    max(20, t('channel_message_2')).required(t('channel_message_3')).notOneOf(namesCh, t('channel_message_4')),      
  });    

  const formik = useFormik({
    initialValues: {
      newChannel: activeNameCh, 
    },
    validationSchema: schema,    
    onSubmit: (values) => {    
      // ntn block 
      btnSubmitRef.current.setAttribute ("disabled","");
      btnCancelRef.current.setAttribute ("disabled","");      
      //filter
      const newCh = leoFilter.clean(values.newChannel);

      if (isitnewch === 'true')  
        createNewCh(newCh).catch(() => {
        btnSubmitRef.current.removeAttribute ("disabled");
        btnCancelRef.current.removeAttribute ("disabled"); 
      });
      if (isitnewch === 'false')  
        renameCh(newCh).catch(() => {       
        btnSubmitRef.current.removeAttribute ("disabled");
        btnCancelRef.current.removeAttribute ("disabled"); 
      });
    }   

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

      toast.success(t('toastify_new'), toastObj);        
         
    } catch (err) {
      console.error(err);
      dispatch(setChannelsError(err.response ? err.response.statusText +`. `+err.message : err.message));
     // throw err;
       toast.error(t('toastify_err'), toastObj);   
      throw err;     
    }
  };  

  const renameCh = async (text) =>{          
    //         
    try {
      const response = await axios.patch([paths.channelsPath(), idch].join('/'), {name: text}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Channel was renamed", response.data); 
      // reset input
      //inputRef.current.value = ''
      formik.values.newChannel = "";
      //remove modal
      props.onHide();
      
      toast.success(t('toastify_ren'), toastObj);        
         
    } catch (err) {
      console.error(err);
      dispatch(setChannelsError(err.response ? err.response.statusText +`. `+err.message : err.message));
     // throw err;      
      toast.error(t('toastify_err'), toastObj);
      throw err;           
    }
  };  


  return (
    <Modal
    {...props}   
    aria-labelledby="contained-modal-title-vcenter"
    centered >
      <Form onSubmit = {formik.handleSubmit}>   

      <Modal.Header >        
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
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
         ref={inputRef}                  
         />
          {(formik.touched.newChannel && formik.errors.newChannel) ? 
          <Form.Text id="newChanneleBlock" muted>
            {formik.errors.newChannel}
          </Form.Text> : null}              
       </Modal.Body>  

        <Modal.Footer>       
          <Button variant="secondary" ref = {btnCancelRef} onClick={props.onHide}>{t("cancel")}</Button>
          <Button variant="success" ref = {btnSubmitRef} type="submit">{t("sent")}</Button>          
        </Modal.Footer>   

        </Form>  
    </Modal>
  )
}

  ModalNewChannel.propTypes = {   
    allchannels: PropTypes.array.isRequired,
    isitnewch: PropTypes.string.isRequired,
    idch: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired, 
  };

  export default ModalNewChannel;