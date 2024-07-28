import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import  {Form, Card}  from 'react-bootstrap';

import logins from '../routes.js';
import { setLogIn, removeLogIn, setError } from '../Slices/autorizSlice.js';

 
const schema = yup.object().shape({
    username: yup.string().trim().min(3, 'User name must be at least 3 characters long').
    max(20, "User name must be 20 characters or less").
    required("User name is a required field"),    
    password: yup.string().required().min(4, 'Password must be at least 4 characters long'),    
  });

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
    
    //render error from state.auth
    const ShowAuthError = () => {
      const err = useSelector((state) => state.auth.error);
      if (err === "") return;
      return (
        <div>{err}</div>
      )
    };

    const autorizRequest = async (values) => {
      try {
        const response = await axios.post(logins.loginPath(),values);       
        localStorage.setItem('userIdToken', response.data.token);           
        console.log(localStorage);        
        dispatch(setLogIn()); 
      }
      catch (err) {
        console.error (err);
        dispatch(setError(err.message));
      }
    };

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {       
        autorizRequest(values);
       // console.log(JSON.stringify(values, null, 2));
      },
    });    

    return (  
      
    <Card style={{ width: '20rem', margin: 'auto', }}>
     <Card.Body>
     <Card.Title size = 'lg'>Login</Card.Title>     

      <Form onSubmit={formik.handleSubmit}>

        <Form.Group className="mb-3" controlId="FormLogin.username">
         <Form.Label htmlFor="username">User name</Form.Label>
          <Form.Control
           id="username"
           name="username"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.username}
           aria-describedby="usernameBlock"
          />         
          {formik.touched.username && formik.errors.username ? (
            <Form.Text id="usernameBlock" muted>
              {formik.errors.username}
            </Form.Text> ) : null}
        </Form.Group>        

        <Form.Group className="mb-3" controlId="FormLogin.password">
          <Form.Label htmlFor="password">Password</Form.Label>
           <Form.Control
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            aria-describedby="passwordBlock"
           />
          {formik.touched.password && formik.errors.password ? (
            <Form.Text id="passwordBlock" muted>
              {formik.errors.password}
            </Form.Text> ) : null}          
        </Form.Group> 

        <button type="submit">Submit</button>  
        <ShowAuthError/>  

        </Form> 

       </Card.Body>
      </Card>           
     
    );
  };
  
  