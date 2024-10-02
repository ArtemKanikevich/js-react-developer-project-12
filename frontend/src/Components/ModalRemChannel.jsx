import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import  { Button, Modal}  from 'react-bootstrap';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import paths from "../routes.js";
import toastObj from "../toastObj.js";


const ModalRemChannel = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { chid } = props;
      

    const token = localStorage.getItem("userIdToken"); 
    //const [error, setError] = useState(false);
      
    //remove Channel
    const removeCh = async (id) =>{          
      //         
      try {       
        const response = await axios.delete([paths.channelsPath(), id].join("/"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(`Channel id: ${response.data.id} was deleted `);         
        //remove modal
        props.onHide(); 

        toast.success(t('toastify_chRem'), toastObj);                  
           
      } catch (err) {
        console.error(err);
        dispatch(setChannelsError(err.response ? err.response.statusText +`. `+err.message : err.message));
        //throw err;
        toast.error(t('toastify_err'), toastObj);        
      }
  };
    
  
    return (    
            
        <Modal
        {...props}   
        aria-labelledby="contained-modal-title-vcenter"
        centered >  
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {t("remove")} {t("channel")} 
            </Modal.Title>
          </Modal.Header>
  
           <Modal.Body>           
              {t("channel_message_5")}        
           </Modal.Body>  
  
            <Modal.Footer>       
              <Button variant="secondary" onClick={props.onHide}>{t("cancel")}</Button>
              <Button onClick = {() => removeCh(chid)} variant="success">{t("remove")}</Button>          
            </Modal.Footer>     
            
        </Modal>     
    )
  }

  export default ModalRemChannel;