import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="textUnderNav">
				<h2 style={{color: 'white'}}>CHECK OUT THE DOG BREEDS</h2>
			</div>
			
			<Card/>
		</div>
	);
};
