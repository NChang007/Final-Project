const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			breeds: [],
			
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
					if (data.msg == "created") {
						//rederect to login
						this.props.history.push('/login')
					  } else {
						setStore({ message: data.msg });
					  }

					return true;
				  } catch (error) {
					console.error("there was an error", error);
				  }
			}


			// // Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
