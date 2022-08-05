import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card";

function Profile() {
    const { store, actions } = useContext(Context);
    const [loaded, setLoaded] = useState(false)
    const history = useNavigate();

    useEffect(() => {
        if (!store.token) history("/login")
    }, []);
    if (!loaded && store.token) {
        actions.loadFavorites()
        setLoaded(true);
    }
    console.log(store);
    let test = []
    store.favorites.forEach(f => {
        store.breeds.forEach((b, i) => {
            if (f.fave_id == i) {
                test.push(b)
            }
        })
    });
    console.log(test);
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
            <h2>FAVORITES</h2>
            { test.length > 0 &&
                test.map((breed, idx) => {
                    return (
                        <div className="col-3" key={idx}>
                            <Card breed={breed} id={idx}/>
                        </div>                            
                    )}
                )  
            }
        </div>
    </div>
  )
}

export default Profile