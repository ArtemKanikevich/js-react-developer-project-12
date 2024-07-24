import React from 'react';
//import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
    userName: yup.string().trim().min(3, 'must be at least 3 characters long').max(20, "Must be 20 characters or less").required("User name is a required field"),    
    password: yup.string().required().min(6, 'must be at least 6 characters long'),    
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
    const formik = useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
        console.log(JSON.stringify(values, null, 2));
      },
    });    

    return (
      <div>   
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">User name</label>
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName ? (
         <div>{formik.errors.userName}</div>
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