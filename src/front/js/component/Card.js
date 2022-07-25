import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Card() {
  return (
    <div className="card" style={{width: "18rem", margin: '1rem 3rem'}}>
        <img className="card-img-top" src="https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc4MzAwMjIwNTk2MDM3MjI5/german-shepherd-puppy-bite-inhibition-games.jpg" alt="aCrd image cap"/>

        <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <ul className='card-text'>
                <li>German Shepherd</li>
                <li>70lb-80lb</li>
                <li>Active</li>
            </ul>
        </div>
        <div style={{margin:'1em'}}>
          <Link to={"/pages/AboutCharacterPage/" + c_id}>
            <span className="btn btn-primary">Learn More</span>
					</Link>
          <i 
          className="far fa-lg fa-heart favBtn" 
          style={{margin:'0rem 0rem 0rem 7rem'}}
          onClick={() => actions.handleFavorites(c_id, "char", character.name)}
          ></i>
        </div>
        
    </div>
 
  )
}

export default Card