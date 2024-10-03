import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import  {Container, Spinner}  from 'react-bootstrap';
import { io } from "socket.io-client";
import { useTranslation } from 'react-i18next';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { renameChannel, removeChannel, addChannels, addChannel, setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";
import Messages from "./Messages.jsx";
import Channels from "./Channels.jsx";
import mobileAdapter from "../mobileAdapter.js";
import toastObj from "../toastObj.js";

//import logo from "../logo.svg";

export const MainPage = () => {
  const dispatch = useDispatch();  
  const { t } = useTranslation();
  const[loading, setLoading] = useState(true);
  const [forMobile, setForMobile] = useState(false);
  
  useEffect(() => {
    // localStorage.clear("userId");    
    //dispatch(setLogIn());
    const token = localStorage.getItem("userIdToken");
    const firstId = "1";  //general
    let socketV = null;
    

    const getChannels = async (token) => {
      try {
        const response = await axios.get(paths.channelsPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`channels: `, response); // =>[{ id: '1', name: 'general', removable: false }, ...]
        dispatch(addChannels(response.data));
       
      } catch (err) {
        console.error(err);
        dispatch(setChannelsError(err.response ? err.response.statusText +`. `+err.message : err.message));
        throw err;
      }
    }
    
    const getMessages = async (token) => {
      try {
        const response = await axios.get(paths.messagesPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`messages: `, response); // =>[{ id: '1', name: 'general', removable: false }, ...]
        dispatch(addMessages(response.data));

      } catch (err) {
        console.error(err);
        dispatch(setMessagesError(err.response ? err.response.statusText +`. `+err.message : err.message));
        throw err;
      }      
    };
 
    const socketConnect = () => {
      //close spinner
      setLoading(false);      
      //console.log ("Socket start!");
      const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
      console.log ("socket URL:", URL);
      console.log("process.env:",process.env);
      const socket = io(URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true
      }); 
      
      socket.on("connect", () => {        
        console.log("Connect: ", socket.connected); // true
        toast.success(t('toastify_soc'), toastObj);                  
      });

      socket.on("disconnect", () => {        
        console.log("Connect: ", socket.connected); // false
      });

      socket.on("connect_error", (error) => {
        if (socket.active) {
          // temporary failure, the socket will automatically try to reconnect
          toast.warn(t('toastify_war'), toastObj);          
          
        } else {
          // the connection was denied by the server
          // in that case, `socket.connect()` must be manually called in order to reconnect
          console.log(error.message);
          toast.error(t('toastify_err'), toastObj);        
        }
      });

      socket.on('newMessage', (payload) => {
        //console.log("New message from socket: ", payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        dispatch(addMessage(payload));
      });
      
      socket.on('newChannel', (payload) => {
         console.log("New channel from socket: ", payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
         dispatch(addChannel(payload));
      });

      socket.on('removeChannel', (payload) => {
         console.log("Channel was delated from socket: ", payload); // id
         dispatch(removeChannel(payload));
         // set current Ch after delete  ?? find ??
         dispatch(setCurrentChannel(firstId));
      }); 

      socket.on('renameChannel', (payload) => {
         console.log("Channel was renamed from socket: ", payload); // id
         dispatch(renameChannel(payload));
      });
      
      return socket;
    };
    

    Promise.all([getChannels(token), getMessages(token)]).then(() => socketV = socketConnect()).catch((err) => 
    toast.error(t('toastify_err'), toastObj));
    //.then((socket)=> socketV = socket);
    const resizeReset = mobileAdapter(setForMobile);
    
    return () => {
      // Эта логика выполнится только при размонтировании компонента
      console.log("Main Page unmount");      
      socketV.disconnect();
      resizeReset();
      
    };
    //dispatch(setLogIn());
    //only in first render []
  },[]);  

  return (
    <Container>
      <div className="content">      
        {loading ? (
           <div className="spinner__container">
            <Spinner animation="border" role="status" variant="success">
               <span className="visually-hidden">Loading...</span>
            </Spinner> 
           </div>
           ):
         <>        
         {forMobile || <Channels inOffCanvas = {false}/> } 
         <Messages forMobile = {forMobile}/>
         <ToastContainer role="alert"/>
         </>
        }
      </div>     
    </Container> 
      
    );  
}; 

/*
 
-------------
 <Messages forMobile = {forMobile}/>
*/