import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, ListGroup, Dropdown, ButtonGroup, Row, Col, Card, Form, Button, Modal, DropdownButton, InputGroup}  from 'react-bootstrap';
import { setCurrentChannel } from "../Slices/channelsSlice.js";
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";


const ModalNewCh = (props) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      newChannal: '', 
    },    
    onSubmit: (values) => {createNewCh(values)}       
  });     
   
  return (    
    <Form 
    onSubmit = {formik.handleSubmit}>      
    
      <Modal
      {...props}   
      aria-labelledby="contained-modal-title-vcenter"
      centered >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("addChannal")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>           
          <Form.Control 
           className="me-auto"
           name="newChannal"
           type="text"            
           onChange={formik.handleChange}
           value={formik.values.newChannal}            
           aria-describedby="newChannal"
           autoFocus                  
           />            
         </Modal.Body>  

          <Modal.Footer>       
            <Button variant="secondary" onClick={props.onHide}>{t("cancel")}</Button>
            <Button variant="success" type="submit">{t("sent")}</Button>          
          </Modal.Footer>   
      
      </Modal>
    </Form>  
  )
}


const Channals = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showModalNewCh, setModalNewCh] = useState(false);
    const { data, currentCh } = useSelector((state) => state.channels);

   //change channel
    const handleClick = (e) => {
       // console.dir(e.target.dataset.asId);
        dispatch(setCurrentChannel(e.target.dataset.asId));
    }  
   

    return(
      data != undefined ? (  
       <div className="branches branches__container">

        <div className="branches__title">
            {t('channels')}
            <Button onClick ={() => setModalNewCh(true)} variant="success" size="sm">+</Button>
        </div>

        {data.map(elem => (                 

          <Dropdown as={ButtonGroup} key = {`channal-${elem.id}`}>
              <Button onClick = {handleClick} variant="success" data-as-id = {elem.id}>{elem.name}</Button>
              <Dropdown.Toggle split variant="success" id={`dropdown-split-${elem.id}`}/> 
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        ))}               
      
        <ModalNewCh
        show={showModalNewCh}
        onHide={() => setModalNewCh(false)}/>      

      </div> 
      ): null 
    )
}


export default Channals;

/* list with channals!!!
<div className="branches__list">
<ListGroup variant="flush">
  {data.map(elem => (               
     <ListGroup.Item onClick = {handleClick} key = {`channal-${elem.id}`} variant="success" action data-as-id = {elem.id}            
     >{elem.name}</ListGroup.Item>
  ))}           
</ListGroup>
</div> */