import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from 'formik';
import  {Container, Row, Col, Card, Form, Button, Stack, InputGroup}  from 'react-bootstrap';
//import { addMessages, setMessagesError, addMessage } from "../Slices/messagesSlice.js";
import paths from "../routes.js";

const Channals = () =>{
    return(
        <div className="branches branches__container">
       </div>
    )
}

export default Channals;