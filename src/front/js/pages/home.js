import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";
import queryString from "query-string";
import Pagination from "../component/Pagination";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [dogs, setDogs] = useState([]);

	// User is currently on this page
	const [currentPage, setCurrentPage] = useState(1);
	// No of Records to be displayed on each page   
	const [recordsPerPage] = useState(20);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	// Records to be displayed on the current page
	const currentRecords = dogs.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(dogs.length / recordsPerPage)

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
			<div className="divUNav">
				
				<input placeholder=" Search dog breed" className="sBar w-50 py-2" onChange={event => searchHash(event.target.value)}/>
			</div>
			
			
			
			
			{currentRecords.map((breed, idx) => {
				let c = actions.checkFav(breed.id) ? "favorite" : ""
				return (
				<div className="col-3" key={idx}>
					<Card breed={breed} c={c}/>
				</div>
				);
			})}	

			<Pagination
				nPages = { nPages }
				currentPage = { currentPage } 
				setCurrentPage = { setCurrentPage }
			/>
		</div>
	);
};
