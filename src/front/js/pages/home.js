import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";
import queryString from "query-string";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [dogs, setDogs] = useState([]);
	useEffect(()=> {
		searchHash("")
	},[]);
	useEffect(() => {
		const qs = queryString.parse(location.hash);
		console.log("This is parsed info: ", qs);
		searchFunction(qs.keyword);
	}, [store.breeds]);

	const searchFunction = keyword => {
		console.log("Search function keyword: ", keyword);
		let filteredArray = store.breeds.filter(item => {
			if (keyword == "" || keyword == undefined) {
				return item;
			} else if (item.breedName.toLowerCase().includes(keyword.toLowerCase())) {
				return item;
			}
		});
		setDogs(filteredArray);
	};

	const searchHash = word => {
		searchFunction(word);
		if (word == "") {
			setDogs(store.breeds);
		}
		location.hash = `keyword=${word}`;
	};







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
				<h2 style={{color: '#616161 '}}>CHECK OUT THE DOG BREEDS</h2>
				<input placeholder="Search dog breed" className="w-50 py-2" onChange={event => searchHash(event.target.value)}/>
			</div>
			
			
			
			
			{dogs.map((breed, idx) => {
				return (
				<div className="col-3" key={idx}>
					<Card breed={breed} id={idx}/>
				</div>
				);
			})}	
		</div>
	);
};
