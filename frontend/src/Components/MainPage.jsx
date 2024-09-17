import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import  {Container, Row, Col, Card}  from 'react-bootstrap';
import { io } from "socket.io-client";
import { setLogIn, removeLogIn } from '../Slices/autorizSlice.js';
import { renameChannel, removeChannel, addChannels, addChannel, setChannelsError, setCurrentChannel } from "../Slices/channelsSlice.js";
import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";
import Messages from "./Messages.jsx";
import Channals from "./Channals.jsx";

//import logo from "../logo.svg";

export const MainPage = () => {
  const dispatch = useDispatch();
    
  useEffect(() => {
    // localStorage.clear("userId");    
    //dispatch(setLogIn());
    const token = localStorage.getItem("userIdToken");
    const firstId = "1";  //general

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
 
    
    Promise.all([getChannels(token), getMessages(token)]).then(()=> {    
      //console.log ("Socket start!");
      const socket = io('http://localhost:5001', {
        transports: ['websocket', 'polling'],
        withCredentials: true
      }); 
      
      socket.on("connect", () => {        
        console.log("Connect: ", socket.connected); // true
      });

      socket.on("connect_error", (error) => {
        if (socket.active) {
          // temporary failure, the socket will automatically try to reconnect
          console.log("Wait a minute!, server problems...");
        } else {
          // the connection was denied by the server
          // in that case, `socket.connect()` must be manually called in order to reconnect
          console.log(error.message);
        }
      });

      socket.on('newMessage', (payload) => {
        console.log("New message from socket: ", payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
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

    });  
    
    return () => {
      // Эта логика выполнится только при размонтировании компонента
      console.log("Main Page unmount")
    };
    //dispatch(setLogIn());
    //only in first render []
  },[]);  

  return (
    <Container>
      <div className="content">      
        <Channals/>
        <Messages/>

      </div>     
    </Container> 
      
    );  
}; 

/*
 <Container className="vh-100" >
      <Row className="vh-100">
        <Col className= "custom-elem2" d-flex align-items-start justify-content-center xs={6} md={3}>          
        </Col>
        <Col >
       
        <Card>
          <Card.Header as="h5">#Chanal_name</Card.Header>
             <Card.Body>                
                <Card.Text>
                  X Messages
                </Card.Text>              
            </Card.Body>
         </Card>
            
        </Col>
      </Row>
    </Container>
-------------
<Container >
        <Row> 
          <Col xs={6} md={3}>
            <div className="custom-elem">Column 11</div>
          </Col>
          <Col>
             <div className=" custom-elem">Column 12</div>
          </Col>
        </Row>    
        <Row >
          <Col xs={6} md={3}>
            <div className="custom-elem">Column 21</div>
          </Col>
          <Col>
             <div className=" custom-elem">Column 22</div>
          </Col>
        </Row>           
                
      </Container>
*/