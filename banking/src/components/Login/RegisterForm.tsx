import React from "react";
import './loginForm.css';
import { Formik, FormikErrors } from "formik";


interface FormValues {
     username: string;
     email: string;
     password: string;
     password_conf: string;
}

const RegisterForm = () => {
     const initialValues: FormValues = { username: '', email: '', password: '', password_conf: '' };
     return (
          <>
               <div className="form-container register-form">
                    <Formik
                         initialValues={initialValues}
                         validate={values => {
                              let errors: FormikErrors<FormValues> = {}
                              if (!values.username) {
                                   errors.username = 'Username required';
                              }
                              if (!values.email) {
                                   errors.email = 'Email required';
                              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                   errors.email = 'Invalid email';
                              }
                              if (!values.password) {
                                   errors.password = 'Password required';
                              } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
                                   errors.password = 'Weak password';
                              }
                              if (values.password_conf != values.password) {
                                   errors.password_conf = 'Password must be identical'
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
                                        type="text"
                                        placeholder="username"
                                        name="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        autoComplete="off"
                                   />
                                   {errors.username}
                                   <input
                                        type="text"
                                        placeholder="e-mail"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        autoComplete="off"
                                   />
                                   {errors.email}
                                   <input
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                   />
                                   {errors.password}
                                   <input
                                        type="password"
                                        placeholder="confirm password"
                                        name="password_conf"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password_conf}
                                   />
                                   {errors.password_conf}
                                   <button className="form-button" type="submit" disabled={isSubmitting}>Register</button>
                              </form>
                         )}
                    </Formik>
               </div>
          </>
     );
};

export default RegisterForm;
