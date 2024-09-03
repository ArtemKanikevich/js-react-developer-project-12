import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import  {Form, Card, Stack, Button}  from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import paths from '../routes.js';
import { setLogIn, setLogError } from "../Slices/autorizSlice.js";


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
export const Singup = () => {
    //const navigate = useNavigate();   
    // Возвращает метод store.dispatch() текущего хранилища
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // validation object 
    const schema = yup.object().shape({
      username: yup.string().trim().min(3, t('login_message_1')).
      max(20, t('login_message_2')).required(t('login_message_3')),    
      password: yup.string().required(t('login_message_4')).
      min(5, t('login_message_5')), 
      confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('login_message_7'))
      .required(t('login_message_6')),

    });    
    //render error from state.auth
    const ShowAuthError = () => {
      const err = useSelector((state) => state.auth.error);
      if (err === "") return;
      return (
        <>
        <br />
        <div style = {{color: 'red'}}>{t('error') + err}</div>
        </>
      )
    };

    const autorizRequest = async (values) => {
      try {
        //get id Token in login request
        const response = await axios.post(paths.signupPath(),values);
           
           console.log(response.data);  
           localStorage.setItem('userIdToken', response.data.token);  
           localStorage.setItem('userIdName', values.username);  
           //setlogin - true, render
           dispatch(setLogIn()); 
           //error reset
           dispatch(setLogError(""));
        }      
      
      catch (err) {
        console.error (err);
        // save error in state
        dispatch(setLogError(err.response ? err.response.statusText +`. `+err.message : err.message));
      }
    };

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
        confirmPassword: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {       
        
        const { confirmPassword, ...reqValues  } = values;  
        autorizRequest(reqValues);
       // console.log(reqValues);
      },
    });  
    

    return (  
      
    <Card style={{ width: '20rem', margin: 'auto', }}>
     <Card.Body>
     <Card.Title>{t('sing_up')}</Card.Title>     

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

        <Form.Group className="mb-3" controlId="FormLogin.confirmPassword">
          <Form.Label>{t('conf_password')}</Form.Label>
           <Form.Control
           // id="password"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            aria-describedby="confirmPassword"
            autoComplete="current-password"
            className = {formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : null}
           />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <Form.Text id="confirmPasswordBlock" muted>
              {formik.errors.confirmPassword}
            </Form.Text> ) : null}          
        </Form.Group>         
       
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">{t('create_user')}</Button>
        </div>       
       
        <ShowAuthError/>  

        </Form> 
       </Card.Body>
      </Card>           
     
    );
  };

 // <Stack direction="horizontal" gap={3} className="col-md-5 mx-auto">