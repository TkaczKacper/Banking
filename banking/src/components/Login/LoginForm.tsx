import React from "react";
import './loginForm.css';

const LoginForm = () => {

     return (
          <div className="form-container">
               <form className="login-form" onSubmit={(e) => { e.preventDefault() }}>
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button className="form-button" type="submit">Login</button>
               </form>
          </div>
     );
};

export default LoginForm;
