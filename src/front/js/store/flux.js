const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			breeds: [],
			favorites: [],
			
		},
		actions: {
			// token -----------------------------------------------------------------------------------
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined)
				  setStore({ token: token });
			  },
		
			  logout: () => {
				const token = sessionStorage.removeItem("token");
				setStore({ token: null });
			  },
			
			//Login ---------------------------------------------------------------------------------------
			login: async (email, password) => {
				const opts = {
				  method: "POST",
				  mode: "cors",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					// "Access-Control-Allow-Headers": "Origin",
					//"X-Requested-With, Content-Type": "Accept",
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				};
				try {
				  const resp = await fetch(
					"https://3001-nchang007-finalproject-mcfd2qsormk.ws-us54.gitpod.io/api/login",
					opts
				  );
				  if (resp.status !== 200) {
					alert("there has been an error");
					return false;
				  }
				  const data = await resp.json();
				  console.log(data);
				  if (data.msg) {
					setStore({ message: data.msg });
				  } else {
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token});
				  }
		
				  return true;
				} catch (error) {
				  console.error("there was an error", error);
				}
			  },
			// load dog breeds------------------------------------------------------------------------------------------------------
			loadBreeds: () => {
				//get the store
				const store = getStore();
				// const opts = {
				//   headers: {
				//     "Authorization":"Bearer "+ store.token
				//   }
				// }
				//fetch
				fetch(
				  "https://api-dog-breeds.herokuapp.com/api/dogs"
				)
				  .then((response) => response.json())
				  .then((data) => {
					console.log(data);
					for (let i = 0; i < data.length; i++) {
					  // data.data[i].fav = false;
					  data[i].type = "breed";
					}
					// store.planets = data.results;
					// setStore(store);
					setStore({ breeds: data });
				  })
				  .catch((error) => {
					//error handling
					console.log(error);
				  });
			},
			// add user ------------------------------------------------------------------------------------------------------------------
			createUser: async (Uname, email, password) => {
				const store = getStore();
				const opts = {
					method: "POST",
					mode: "cors",
					headers: {
					  "Content-Type": "application/json",
					  "Access-Control-Allow-Origin": "*",
					  // "Access-Control-Allow-Headers": "Origin",
					  //"X-Requested-With, Content-Type": "Accept",
					},
					body: JSON.stringify({
					  Uname: Uname,
					  email: email,
					  password: password,
					}),
				};
				try {
					const resp = await fetch(
					  "https://3001-nchang007-finalproject-mcfd2qsormk.ws-us54.gitpod.io/api/createUser",
					  opts
					);
					if (resp.status !== 200) {
					  alert("there has been an error");
					  return false;
					}
					const data = await resp.json();
					console.log(data);
					if (data.status == "true") {
						//rederect to login
						window.location.href ="https://3000-nchang007-finalproject-mcfd2qsormk.ws-us54.gitpod.io/login"
					  } else {
						setStore({ message: data.msg });
					  }

					return true;
				  } catch (error) {
					console.error("there was an error", error);
				  }
			},
			// favorites-----------------------------------------------------------------------------------------------------------------------------------
			loadFavorites: () => {
				const store = getStore();
				if (sessionStorage.getItem("token")) {
				  const opts = {
					headers: {
					  Authorization: "Bearer " + store.token,
					},
				  };
				  fetch(
					"https://3001-nchang007-starwarsblogr-nstabynatpx.ws-us54.gitpod.io/api/favorites",
					opts
				  )
					.then((response) => response.json())
					.then((data) => {
					  setStore({ favorites: data.favorites });
					})
					.catch((error) => {
					  //error handling
					  console.log(error);
					});
				}
			},

			handleFavorites: (idx, type, name) => {
				let store = getStore();
		
				// if favorite exists - delete
				if (store.favorites.filter((f) => f.fave_id == idx).length > 0) {
				  const opts = {
					method: "DELETE",
					headers: {
					  Authorization: "Bearer " + store.token,
					},
				  };
				  let f = store.favorites.filter((f) => f.fave_id == idx);
				  fetch(
					"https://3001-nchang007-starwarsblogr-nstabynatpx.ws-us54.gitpod.io/api/deletefav/" +
					  f[0].id,
					opts
				  )
					.then((response) => response.json())
					.then((data) => {
					  setStore({ favorites: data.favorites });
					})
					.catch((error) => {
					  //error handling
					  console.log(error);
					});
				} else {
				  const opts = {
					method: "POST",
					headers: {
					  Authorization: "Bearer " + store.token,
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  "fave_id": idx,
					  "item_type": type,
					  "name": name,
					}),
				  };
				  //add the new one
				  fetch(
					"https://3001-nchang007-starwarsblogr-nstabynatpx.ws-us54.gitpod.io/api/addfavorites",
					opts
				  )
					.then((response) => response.json())
					.then((data) => {
					  setStore({ favorites: data.favorites });
					})
					.catch((error) => {
					  //error handling
					  console.log(error);
					});
				}
			}
		}
	};
};

export default getState;
