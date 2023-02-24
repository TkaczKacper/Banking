import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { Formik, FormikErrors } from "formik";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

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
   const [disabled, setDisabled] = useState(true);
   const [cookie, setCookie] = useCookies(["isLogged", "userId", "username"]);
   const [validationError, setValidationError] = useState("");
   useEffect(() => {
      if (validationError.length > 0) {
         setDisabled(true);
      }
   }, [validationError]);
   return (
      <>
         {cookie.userId ? (
            <Navigate to="/account" />
         ) : (
            <div className="form-container">
               <Formik
                  initialValues={initialValues}
                  validate={(values) => {
                     let errors: FormikErrors<FormValues> = {};
                     if (!values.username) {
                        errors.username = "Pole wymagane";
                     } else if (values.username.length < 6) {
                        errors.username = "Nazwa użytkownika zbyt krótka!";
                     } else if (values.username.length > 20) {
                        errors.username = "Nazwa użytkownika zbyt długa!";
                     }
                     if (
                        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                           values.email
                        )
                     ) {
                        errors.email = "Nieprawidłowy adres email.";
                     }
                     if (
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/i.test(
                           values.password
                        )
                     ) {
                        errors.password = "Hasło nie spełnia wymogów.";
                     }
                     if (values.password_conf != values.password) {
                        errors.password_conf = "Hasła nie mogą się różnić.";
                     }
                     if (
                        !errors.username &&
                        !errors.email &&
                        !errors.password &&
                        !errors.password_conf
                     ) {
                        setDisabled(false);
                     } else {
                        setDisabled(true);
                     }
                     return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                     const valuesToFetch = { ...values };
                     setTimeout(() => {
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
                        .then((result) => {
                           if (!result || !result.ok || result.status >= 400) {
                              throw new Error(
                                 "Something went wrong, try again later."
                              );
                           }
                           return result.json();
                        })
                        .then((data) => {
                           if (data) {
                              setValidationError(data.content);
                              if (data.content === "Registered") {
                                 setCookie("isLogged", true, { path: "/" });
                                 setCookie("userId", data.details.userId, {
                                    path: "/",
                                 });
                                 setCookie("username", data.details.username, {
                                    path: "/",
                                 });
                                 window.location.href = "/account";
                              }
                           } else return;
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
                  }) => (
                     <form
                        className="login-form"
                        id="register-form"
                        onSubmit={handleSubmit}
                        onChange={() => {
                           setValidationError("");
                        }}
                     >
                        <input
                           type="text"
                           placeholder="nazwa użytkownika"
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
                           placeholder="hasło"
                           name="password"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <input
                           type="password"
                           placeholder="powtórz hasło"
                           name="password_conf"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password_conf}
                        />
                        {errors.password_conf &&
                           touched.password_conf &&
                           errors.password_conf}
                        {!errors.password_conf && validationError}
                        <button
                           className="form-button"
                           id="register-button"
                           type="submit"
                           disabled={disabled}
                        >
                           Załóż konto
                        </button>
                     </form>
                  )}
               </Formik>
            </div>
         )}
      </>
   );
};

export default RegisterForm;
