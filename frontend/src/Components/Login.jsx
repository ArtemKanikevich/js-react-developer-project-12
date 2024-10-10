import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import  {Form, Card, Stack, Button}  from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import paths from '../routes.js';
import { setLogIn, setLogError } from "../Slices/autorizSlice.js";
import AuthError from "./AuthError.jsx";

/*fields - объект с ключами полей userName, password.  
const validate = (fields) => {
    try {
      schema.validateSync(fields, { abortEarly: false });
      return {};
    } catch (e) {   
      // retern объект с ключами где есть err. validate.name - pole,  validate.name.message - message in schema 
      return keyBy(e.inner, 'path');
    }
  };  */
// форма авторизации
export const LogInForm = () => {
    //const navigate = useNavigate();   
    // Возвращает метод store.dispatch() текущего хранилища
    const dispatch = useDispatch();
    const { t } = useTranslation();
    //huke for singup form
    const navigate = useNavigate();
    const btnSabmitRef = useRef(null);
    const btnSingRef = useRef(null);
    // validation object 
    const schema = yup.object().shape({
      username: yup.string().trim().min(3, t('login_message_1')).
      max(20, t('login_message_2')).required(t('login_message_3')),    
      password: yup.string().required(t('login_message_4')).
      min(5, t('login_message_5')), 
    });    
    //render error from state.auth
    

    const autorizRequest = async (values) => {
      try {
        //get id Token in login request
        const response = await axios.post(paths.loginPath(),values);   
        if(response.data.token != undefined) {   
           localStorage.setItem('userIdToken', response.data.token);  
           localStorage.setItem('userIdName', values.username);  
           //setlogin - true, render
           dispatch(setLogIn()); 
           //error reset
           dispatch(setLogError(""));
        }
        else dispatch(setLogError(t('tokenErr')));          
       // console.log(localStorage);        
      }
      catch (err) {
        console.error (err);
        // save error in state
        dispatch(setLogError(err.code));
        // throw err for cath block
        throw err;
      }
    };

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        // turn on block button   
        btnSabmitRef.current.setAttribute ("disabled",""); 
        btnSingRef.current.setAttribute ("disabled","");        
        autorizRequest(values).catch(() => {
          btnSabmitRef.current.removeAttribute ("disabled");
          btnSingRef.current.removeAttribute ("disabled");
        });  
        //setTimeout(() => btnSabRef.current.removeAttribute ("disabled"), 2000)); 
      
      },
    });    

    const singupClick = () =>{
      navigate("/singup");
      dispatch(setLogError(""));
    }

    return (  
      
    <Card className ='card__container'>
     <Card.Body>
     <Card.Title>{t('login')}</Card.Title>     

      <Form onSubmit={formik.handleSubmit}>

        <Form.Group className="mb-3" controlId="FormLogin.username">
         <Form.Label >{t('user_name')}</Form.Label>
          <Form.Control
           //id="username"
           name="username"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.username}
           aria-describedby="username"
           autoComplete="username"
           className = {formik.touched.username && formik.errors.username ? "is-invalid" : null}
           autoFocus
          />         
          {formik.touched.username && formik.errors.username ? (
            <Form.Text id="usernameBlock" muted>
              {formik.errors.username}
            </Form.Text> ) : null}
        </Form.Group>        

        <Form.Group className="mb-3" controlId="FormLogin.password">
          <Form.Label>{t('password')}</Form.Label>
           <Form.Control
           // id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            aria-describedby="password"
            autoComplete="current-password"
            className = {formik.touched.password && formik.errors.password ? "is-invalid" : null}
           />
          {formik.touched.password && formik.errors.password ? (
            <Form.Text id="passwordBlock" muted>
              {formik.errors.password}
            </Form.Text> ) : null}          
        </Form.Group> 
        
        <Stack direction="horizontal" gap={3}>
          <Button variant="success" ref ={btnSabmitRef} type="submit">{t('submit')}</Button>
          <Button variant="outline-secondary" ref ={btnSingRef} onClick={singupClick}>{t('sing_up')}</Button>
        </Stack> 
       
        <AuthError/>  

        </Form> 
       </Card.Body>
      </Card>           
     
    );
  };
  
  