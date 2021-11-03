const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			login:(email,password) => {
				var miCabecera = new Headers();
				miCabecera.append("Context_Type","application/json");

				var raw = JSON.stringify({
					"email": email,
					"password": password
				});
				var requestOptions = {
					method : 'POST',
					headers: myCabecera,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://3001-fuchsia-peacock-rd69nei6.ws-us17.gitpod.io/api/login",requestOptions)
				    .then(response => {
						
							console.log("status", response.status);
							return response.json();
						
					})
					.then(result => {
						localStorage.setItem("token", result.data.token);
					})
					.catch(error => console.log('error',error));

			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
