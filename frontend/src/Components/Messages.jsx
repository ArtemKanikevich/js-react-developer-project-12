import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from 'formik';
import  { Form, Button, Spinner, InputGroup}  from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash' ;
import { Slide, toast } from 'react-toastify';
import { leoFilter }  from "./Navbar.jsx";
import { setMessagesError, loadMoreItems } from "../Slices/messagesSlice.js";
import paths from "../routes.js";
import {getAmount, insertMessages} from "../addmessages.js";


const Messages = () => {
   // const [text, setText] = useState("");
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const btnSubmitRef = useRef(null);
    const dispatch = useDispatch();
   
    //spiner
    const[loading, setLoading] = useState(true);
    //infinite scroll
   // const [visibleItems, setVisibleItems] = useState(20); // Изначально показываем 20 элементов
    //

    const messagesArr = useSelector((state) => state.messages.data);
    const { currentCh } = useSelector((state) => state.channels);   
    const channelsArr =  useSelector((state) => state.channels.data);  
    const visibleItems =  useSelector((state) => state.messages.visibleItems); 
    const token = localStorage.getItem("userIdToken");   
    const userName =  localStorage.getItem("userIdName");
    let mesAmount = 0;

    //пропускаем перв. рендер  
    if (messagesArr != undefined && channelsArr != undefined ) 
      mesAmount = messagesArr.reduce((acc,cur)=> cur.channelId === currentCh ? acc + 1 : acc, 0);
    
    //console.log("visibleItems :",visibleItems);
    //infinite scroll    
    const handleScroll = () => {   
      const { scrollTop, clientHeight } = listRef.current;   
     // console.log("scrollTop :", scrollTop);     
     // console.log("visItems :",visibleItems);      
     // console.log("mesAmount :", mesAmount);       
     //console.log("clientHeight :", clientHeight);
     // console.log("crollHeight :", scrollHeight);
      // Если пользователь прокрутил до конца страницы, загружаем больше элементов
      if ((scrollTop === 0) && (mesAmount > visibleItems)) {          
        dispatch(loadMoreItems());
        listRef.current.scrollTop = clientHeight;
      }  
     // if (scrollTop + clientHeight >= scrollHeight) {
     //   loadMoreItems();
     // }
    };    
   
    //infinite scroll  
    useEffect(() => {
      if (listRef.current)
        listRef.current.addEventListener('scroll', handleScroll);
     // console.log(listRef.current);
     // console.log("Scroll mount !"); 
      return () => {
        // Эта логика выполнится только при размонтировании компонента
      //  console.log("Scroll page Unmount");        
        //Убираем обработчик
        if (listRef.current)
          listRef.current.removeEventListener('scroll', handleScroll);
      }  
    }, [messagesArr, currentCh, channelsArr, visibleItems]); 


    useEffect(() => {    
      //Скролл внизу 
      if (listRef.current)        
        listRef.current.scrollTop = listRef.current.scrollHeight;
      if (inputRef.current) {             
        inputRef.current.focus(); // Устанавливаем фокус
      }
      setTimeout(() => setLoading(false), 500);      
      
      return () => {
        // Эта логика выполнится только при размонтировании компонента
       // console.log("Messages page unmount");
        setLoading(true);        
        //возвращаем показ 50 элементов
        dispatch(loadMoreItems(50));
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
         // return true;         

        } catch (err) {
          console.error(err);
          dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
           //  throw err;
          toast.error(t('toastify_err'), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide          
            });        
         // return false;
         // throw err;
        }
      };

  
    
    const formik = useFormik({
      initialValues: {
        message: '', 
      },    
      onSubmit: (values) => {
        btnSubmitRef.current.setAttribute ("disabled","");        
        // filter        
        const message = leoFilter.clean(values.message);
        //insert N auto messages. Type: "/insert-N"
        if (getAmount(values.message)) {
          insertMessages(getAmount(values.message), currentCh, userName, token, setLoading).finally(() => 
            btnSubmitRef.current.removeAttribute ("disabled"));
         // console.log (pr);
        } 
        //normal sending 
        else sendMessage(message)
        .then(() =>  formik.values.message = "")
        .finally(() => btnSubmitRef.current.removeAttribute ("disabled")); //{
          // reset input
         // inputRef.current.value = ''
       //   formik.values.message = "";
       // }
      }       
    });  
    
    // <Form.Group className="mb-3" controlId="formBasicText">

    return (
    //пропускаем перв. рендер  
    messagesArr != undefined && channelsArr != undefined ? (  
    <div className="messages messages__container">        
       <div className="messages__active-chanal">                
          <div className="messages__active-chanal-name">
           <b># {channelsArr.find (elem => elem.id === currentCh).name}</b><br/>
           {mesAmount} {t('key', {count: mesAmount})}
          </div>

          {loading &&
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner> }
          
          <div>                   
           
          </div>
       </div>

       <div ref={listRef} className="messages__list">
        <ul  className="messages__ul">
          { messagesArr.filter(elem => 
            elem.channelId === currentCh )
            .map(elem =>
            <li key = {uniqueId()}><b>{elem.username}:</b> {elem.body}</li>
          ).slice(-visibleItems)
          }           
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
         
         <Button variant="success" ref = {btnSubmitRef} type="submit" id="button-addon2">
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