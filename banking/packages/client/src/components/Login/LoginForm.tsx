import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { Formik, FormikErrors } from "formik";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface FormValues {
   username: string;
   password: string;
}

const LoginForm = () => {
   const [cookie, setCookie] = useCookies(["isLogged", "userId", "username"]);
   const [disabled, setDisabled] = useState(true);
   const [validationError, setValidationError] = useState("");
   const initialValues: FormValues = { username: "", password: "" };
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
                        errors.username = "Pole wymagane!";
                     } else if (values.username.length < 6) {
                        errors.username = "Nazwa użytkownika zbyt krótka!";
                     } else if (values.username.length > 20) {
                        errors.username = "Nazwa użytkowniak zbyt długa!";
                     }
                     if (!values.password) {
                        errors.password = "Pole wymagane!";
                     }
                     if (!errors.password && !errors.username) {
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
                     }, 100);
                     fetch("http://192.168.1.100:5000/auth/login", {
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
                           if (!data) return;
                           if (data.details) {
                              setCookie("isLogged", true, {
                                 path: "/",
                              });
                              setCookie("userId", data.details.userId, {
                                 path: "/",
                              });
                              setCookie("username", data.details.username, {
                                 path: "/",
                              });
                              window.location.href = "/account";
                           }
                           return setValidationError(data.status);
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
                        onSubmit={handleSubmit}
                        onChange={() => {
                           setValidationError("");
                        }}
                     >
                        <input
                           type="username"
                           name="username"
                           placeholder="nazwa użytkownika"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.username}
                           autoComplete="off"
                        />
                        {errors.username && touched.username && errors.username}
                        <input
                           type="password"
                           name="password"
                           placeholder="hasło"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        {!errors.password && validationError}
                        <button
                           className="form-button"
                           type="submit"
                           disabled={disabled}
                        >
                           Zaloguj
                        </button>
                     </form>
                  )}
               </Formik>
            </div>
         )}
      </>
   );
};

export default LoginForm;
