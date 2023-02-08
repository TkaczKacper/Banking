import React from "react";
import "./loginForm.css";
import { Formik, FormikErrors } from "formik";

interface FormValues {
   username: string;
   email: string;
   password: string;
   password_conf: string;
}

const RegisterForm = () => {
   const initialValues: FormValues = {
      username: "",
      email: "",
      password: "",
      password_conf: "",
   };
   return (
      <>
         <div className="form-container register-form">
            <Formik
               initialValues={initialValues}
               validate={(values) => {
                  let errors: FormikErrors<FormValues> = {};
                  if (!values.username) {
                     errors.username = "Username required";
                  } else if (values.username.length < 6) {
                     errors.username = "Username too short!";
                  } else if (values.username.length > 20) {
                     errors.username = "Username too long!";
                  }
                  if (
                     !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                        values.email
                     )
                  ) {
                     errors.email = "Invalid email";
                  }
                  if (
                     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
                        values.password
                     )
                  ) {
                     errors.password = "Weak password";
                  }
                  if (values.password_conf != values.password) {
                     errors.password_conf = "Password must be identical";
                  }
                  return errors;
               }}
               onSubmit={(values, { setSubmitting }) => {
                  const valuesToFetch = { ...values };
                  setTimeout(() => {
                     alert(JSON.stringify(values, null, 2));
                     setSubmitting(false);
                  }, 400);
                  fetch("http://192.168.1.100:5000/auth/register", {
                     method: "POST",
                     credentials: "include",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify(valuesToFetch),
                  })
                     .catch((err) => {
                        return;
                     })
                     .then((result) => {
                        if (!result || !result.ok || result.status >= 400) {
                           throw new Error(
                              "Something went wrong, try again later."
                           );
                        }
                        return result.json();
                     })
                     .then((data) => {
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
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        autoComplete="off"
                     />
                     {errors.username && touched.username && errors.username}
                     <input
                        type="text"
                        placeholder="e-mail"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="off"
                     />
                     {errors.email && touched.email && errors.email}
                     <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                     />
                     {errors.password && touched.password && errors.password}
                     <input
                        type="password"
                        placeholder="confirm password"
                        name="password_conf"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password_conf}
                     />
                     {errors.password_conf &&
                        touched.password_conf &&
                        errors.password_conf}
                     <button
                        className="form-button"
                        type="submit"
                        disabled={isSubmitting}
                     >
                        Register
                     </button>
                  </form>
               )}
            </Formik>
         </div>
      </>
   );
};

export default RegisterForm;
