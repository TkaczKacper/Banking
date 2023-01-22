import React from "react";
import './loginForm.css';
import { Formik, FormikErrors } from "formik";

interface FormValues {
     username: string;
     password: string;
}

const LoginForm = () => {
     const initialValues: FormValues = { username: '', password: '' };
     return (
          <div className="form-container">
               <Formik
                    initialValues={initialValues}
                    validate={values => {
                         let errors: FormikErrors<FormValues> = {}
                         if (!values.username) {
                              errors.username = 'Username required';
                         }
                         if (!values.password) {
                              errors.password = 'Password required';
                         }
                         return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                         setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              setSubmitting(false);
                         }, 400);
                    }}
               >
                    {({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                    }) => (
                         <form className="login-form" onSubmit={handleSubmit}>
                              <input
                                   type="username"
                                   name="username"
                                   placeholder="username"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.username}
                                   autoComplete="off"
                              />
                              {errors.username && touched.username && errors.username}
                              <input
                                   type="password"
                                   name="password"
                                   placeholder="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}
                              />
                              {errors.password && touched.password && errors.password}
                              <button className="form-button" type="submit" disabled={isSubmitting}>Login</button>
                         </form>
                    )}
               </Formik>
          </div>
     );
};

export default LoginForm;
