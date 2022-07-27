import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { store, actions } = useContext(Context);
    const history = useNavigate();

    useEffect(() => {
        if (!store.token) history("/login")
    });
    
  return (
    <div className="profileCont">
        <div>
            { !store.token ?
                <Link to="/login">
                    <button className="btn btn-primary">
                        Log In
                    </button>
                </Link> 
                :
                <button onClick={() => actions.logout()} className="btn btn-primary">
                    Log Out
                </button>
                
            }
        </div>

        <div>
            <h2>Breeds that best suit you</h2>
        </div>
    </div>
  )
}

export default Profile