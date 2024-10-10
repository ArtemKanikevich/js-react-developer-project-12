import React, { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import axios from "axios";
import  { Button, Modal}  from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {setChannelsError} from "../Slices/channelsSlice.js";
import paths from "../routes.js";
import toastObj from "../toastObj.js";


const ModalRemChannel = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const btnSabmitRef = useRef(null);
    const btnCancelRef = useRef(null);    
    const { chid } = props;      

    const token = localStorage.getItem("userIdToken"); 
    //const [error, setError] = useState(false);
      
    //remove Channel
    const removeCh = async (id) =>{          
      //         
      try {       
          await axios.delete([paths.channelsPath(), id].join("/"), {
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
        throw err;            
      }
  };
    
  const btnClick = () => {    
    btnSabmitRef.current.setAttribute ("disabled","");
    btnCancelRef.current.setAttribute ("disabled","");          
    removeCh(chid).catch(() => {
    btnSabmitRef.current.removeAttribute ("disabled");
    btnCancelRef.current.removeAttribute ("disabled")});  
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
              <Button variant="secondary" onClick={props.onHide}
              ref ={btnCancelRef}>{t("cancel")}</Button>
              <Button onClick = {btnClick} ref ={btnSabmitRef} variant="success">{t("remove")}</Button>          
            </Modal.Footer>     
            
        </Modal>     
    )
  }

  ModalRemChannel.propTypes = {       
    chid: PropTypes.string.isRequired,
    onHide: PropTypes.func,
  };

  export default ModalRemChannel;