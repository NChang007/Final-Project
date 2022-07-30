import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import React, { useContext, useState, Component} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const { store, actions } = useContext(Context);
    const [Uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target)
          actions.createUser(Uname, email, password)
        }

    
  return (
    <div className="register-form">
        <form>
            <h1>Register</h1>

            <div className="content">
                <div className="input-field">
                    <input type={"text"} placeholder={'Name'} value={Uname} onChange={(e)=> setUname(e.target.value)}/>
                </div>
                <div className="input-field">
                    <input type={"text"} placeholder={'Email'} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="input-field">
                    <input type={'password'} placeholder={'password'} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <a href="#" className="link">Forgot Your Password?</a>
                <br/>
                <Link to="/login">
                <span>Go Back</span>
                </Link>
            </div>

            <div className="action">
            <button onClick={(e) => handleClick(e)}>Register</button>
            </div>

        </form>
      
    </div>
  )
}

export default Register