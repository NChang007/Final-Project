import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (

		<div>
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">About Paws</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">This will work soon</button>
						</Link>
					</div>
				</div>
			</nav>

			<div className="textUnderNav">
				<h2 style={{color: 'white'}}>CHECK OUT THE DOG BREEDS</h2>
			</div>



		</div>
	);
};
