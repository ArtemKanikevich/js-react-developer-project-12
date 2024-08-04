import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import  {Container, Row, Col, Card}  from 'react-bootstrap';
import { io } from "socket.io-client";
//import { setLogIn, removeLogIn } from '../Slices/autorizSlice.js';
import { addChannels } from "../Slices/channelsSlice.js";
import { addMessages } from "../Slices/messagesSlice.js";
import paths from "../routes.js";
//import logo from "../logo.svg";

export const MainForm = () => {
  const dispatch = useDispatch();

  //requests and show state in console
  useEffect(() => {
    // localStorage.clear("userId");
    //dispatch(removeLogIn());
    const token = localStorage.getItem("userIdToken");

    const dataRequests = async (token) => {
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
      }

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
      }      
    };
 
    dataRequests(token);

    //try {
      const socket = io('http://localhost:5001', {
        transports: ['websocket', 'polling'],
        withCredentials: true
      }); 
      
      socket.on("connect", () => {
        console.log("connect");
        console.log(socket.connected); // true
      });

      socket.on("connect_error", (error) => {
        if (socket.active) {
          // temporary failure, the socket will automatically try to reconnect
        } else {
          // the connection was denied by the server
          // in that case, `socket.connect()` must be manually called in order to reconnect
          console.log(error.message);
        }
      });

      return () => {
        console.log("disconnect");
        socket.disconnect();
      };
   // }
   // catch (err){
    ///  console.error(err);
   // };
   
    //only in first render []
  }, []);

  return (
     <div> prov </div>
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