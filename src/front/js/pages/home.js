import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div 
		 className="row homeCont"
		 style={{
		 padding: "3rem",
		 display: "flex",
		 justifyContent: "center",
		 alignItems: "center",
		}}>
			<div className="textUnderNav">
				<h2 style={{color: 'white'}}>CHECK OUT THE DOG BREEDS</h2>
			</div>
			
			{store.breeds.map((breed, idx) => {
				return (
				<div className="col-3" key={idx}>
					<Card breed={breed} id={idx}/>
				</div>
				);
			})}	
		</div>
	);
};
