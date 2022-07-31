import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/aboutPawsLogo.jpg"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
    	<div className="container">
			<div className="navLeft">
				<img className="logoimg" src={logo} alt="logo"></img>
				<Link to="/" style={{border: "none"}}>
					<span className="title navbar-brand mb-0">About Paws</span>
				</Link>
			</div>


			<div className="navRight">
			<Link to="/Quiz" style={{ margin: "0rem 1rem 0rem 0rem" }}>
				<button className="-btn btn btn-primary">Quiz</button>
			</Link>

			<Link to="/profile">
				<i className="btn far fa-user fa-lg"></i>
			</Link>
			</div>
      	</div>
    </nav>
  );
};
