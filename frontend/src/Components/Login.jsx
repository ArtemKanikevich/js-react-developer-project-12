import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';
import logins from '../routes.js';
import axios from 'axios';

const schema = yup.object().shape({
    username: yup.string().trim().min(3, 'must be at least 3 characters long').
    max(20, "Must be 20 characters or less").
    required("User name is a required field"),    
    password: yup.string().required().min(4, 'must be at least 4 characters long'),    
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

export const SignupForm = () => {
    const navigate = useNavigate();

    const autorizRequest = async (values) => {
      try {
        const response = await axios.post(logins.loginPath(),values);
        //const response = await axios.post("http://localhost:5001/api/v1/login", values);       
        localStorage.setItem('jwtToken', response.data.token);        
        navigate('/', { replace: false });
        console.log(localStorage);
      }
      catch (err) {
        console.error (err);
      }
    };

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
        autorizRequest(values);
       // console.log(JSON.stringify(values, null, 2));
      },
    });    

    return (
      <div>   
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
         <div>{formik.errors.username}</div>
       ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
        
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  };
  
  