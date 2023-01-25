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
                         } else if (values.username.length < 6) {
                              errors.username = "Username too short!";
                         } else if (values.username.length > 20) {
                              errors.username = "Username too long!";
                         }
                         if (!values.password) {
                              errors.password = 'Password required';
                         }
                         return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                         const valuesToFetch = { ...values }
                         setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              setSubmitting(false);
                         }, 400);
                         fetch("http://localhost:5000/auth/login", {
                              method: "POST",
                              credentials: "include",
                              headers: {
                                   "Content-Type": "application/json",
                              },
                              body: JSON.stringify(valuesToFetch),
                         })
                              .catch(err => {
                                   return;
                              })
                              .then(result => {
                                   if (!result || !result.ok || result.status >= 400) {
                                        throw new Error('Something went wrong, try again later.')
                                   }
                                   return result.json();
                              })
                              .then(data => {
                                   if (!data) return;
                                   console.log(data);
                              });
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
