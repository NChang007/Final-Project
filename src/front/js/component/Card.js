import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
 //anything in comment

function Card({breed, c}) {
  const { store, actions } = useContext(Context);


  return (
    <div className="card" style={{width: "18rem", margin: '1rem 3rem'}}>
        <img className="card-img-top" src={breed.image} alt="aCrd image cap"/>

        <div className="card-body">
            <h5 className="card-title" ><strong>{breed.breedName}</strong></h5>
            <ul className='card-text'>
                <li><strong>Height :</strong> {breed.dogInfo.height}</li>
                <li><strong>Weight :</strong> {breed.dogInfo.weight}</li>
                {/* <li>Life Span : {breed.dogInfo.life}</li> */}
            </ul>
        </div>

        <div style={{margin:'1em'}}>
          <Link to={`/pages/AboutCharacterPage/${breed.id}`}>
            <span className="-btn btn btn-primary"><i>Learn More</i></span>
			    </Link>
          <i 
          className={"far fa-lg fa-heart favBtn " + c}
          style={{margin:'0rem 0rem 0rem 6rem'}}
          onClick={(e) => { 
            actions.handleFavorites(breed.id, "char", breed.breedName)
          }}
          ></i>
        </div>
        
    </div>
 
  )
}

export default Card