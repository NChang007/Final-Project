import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import React, { useContext, useState, Component} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {

  //const [characters, setCharacters] = React.useState([])
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const token = sessionStorage.getItem("token");
  console.log(token);
    const handleClick = (e) => {
      e.preventDefault();
      console.log(e.target)
        actions.login(email, password)
      }

      if (store.token && store.token != "" && store.token != undefined) history("/profile")

  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input type={"text"} placeholder={'Email'} value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className="input-field">
            <input type={'password'} placeholder={'password'} value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <a href="#" className="link">Forgot Your Password?</a>
          <br/>
          <Link to="/">
						<span>Continue without Loging in</span>
					</Link>
        </div>
        <div className="action">
          <Link to="/Register">
            <button className="regBtn">Register</button>
					</Link>

          <button onClick={(e) => handleClick(e)}>Sign in</button>
          
        </div>
      </form>
      
      {store.message && <p>{store.message}</p>}
    </div>
  );
}

export default Login;
