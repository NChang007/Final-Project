import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
// import SignUpForm from "./pages/SignUpForm";
// import SignInForm from "./pages/SignInForm";


const Login = () => {
  return (
    <div class="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input type="email" placeholder="Email" autoComplete="nope"/>
          </div>
          <div className="input-field">
            <input type="password" placeholder="Password" autoComplete="new-password"/>
          </div>
          <a href="#" className="link">Forgot Your Password?</a>
        </div>
        <div className="action">
          <button>Register</button>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
