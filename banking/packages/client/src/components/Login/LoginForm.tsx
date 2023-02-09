import React from "react";
import "./loginForm.css";
import { Formik, FormikErrors } from "formik";
import { useCookies } from "react-cookie";

interface FormValues {
   username: string;
   password: string;
}

const LoginForm = () => {
   const [cookie, setCookie, removeCookie] = useCookies([
      "isLogged",
      "userId",
      "username",
   ]);
   console.log(cookie);
   const initialValues: FormValues = { username: "", password: "" };
   let validationError: string = "";
   return (
      <div className="form-container">
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
               if (!values.password) {
                  errors.password = "Password required";
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
                     if (data.details) {
                        console.log(data.loggedIn);
                        setCookie("isLogged", data.loggedIn);
                        setCookie("userId", data.details.userId);
                        setCookie("username", data.details.username);
                        window.location.reload();
                     }
                     return (validationError = data.status);
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
               <form
                  className="login-form"
                  onSubmit={handleSubmit}
                  onChange={() => {
                     validationError = "";
                  }}
               >
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
                  {!errors.password && validationError}
                  <button
                     className="form-button"
                     type="submit"
                     disabled={isSubmitting}
                  >
                     Login
                  </button>
               </form>
            )}
         </Formik>
      </div>
   );
};

export default LoginForm;
