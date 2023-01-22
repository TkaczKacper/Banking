import React from "react";
import './loginForm.css';

const RegisterForm = () => {
     return (
          <>
               <div className="form-container register-form">
                    <form className="login-form" onSubmit={(e) => { e.preventDefault() }}>
                         <input type="text" placeholder="username" name="username" autoComplete="off" />
                         <input type="text" placeholder="e-mail" name="e-mail" autoComplete="off" />
                         <input type="password" placeholder="password" name="password" />
                         <input type="password" placeholder="confirm password" name="password_conf" />
                         <button className="form-button" type="submit">Register</button>
                    </form>
               </div>
          </>
     );
};

export default RegisterForm;
