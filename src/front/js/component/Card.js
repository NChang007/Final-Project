import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
 //anything in comment

function Card({breed, id}) {
  const { store, actions } = useContext(Context);


  return (
    <div className="card" style={{width: "18rem", margin: '1rem 3rem'}}>
        <img className="card-img-top" src={breed.image} alt="aCrd image cap"/>

        <div className="card-body">
            <h5 className="card-title">{breed.breedName}</h5>
            <ul className='card-text'>
                <li>Height : {breed.dogInfo.height}</li>
                <li>Weight : {breed.dogInfo.weight}</li>
                {/* <li>Life Span : {breed.dogInfo.life}</li> */}
            </ul>
        </div>

        <div style={{margin:'1em'}}>
          <Link to={"/pages/AboutCharacterPage/"}>
            <span className="-btn btn btn-primary"><i>Learn More</i></span>
			</Link>
          <i 
          className="far fa-lg fa-heart favBtn" 
          style={{margin:'0rem 0rem 0rem 6rem'}}
          onClick={() => actions.handleFavorites(id, "char", breed.name)}
          ></i>
        </div>
        
    </div>
 
  )
}

export default Card