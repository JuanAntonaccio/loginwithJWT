import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
// import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [auth, setAuth] = useState(false);

	const onSubmit = e => {
		e.preventDefault();
		actions.login(email, password, setAuth);
		//actions.getPlanets();
		//localStorage.getItem("token") !=setAuth(true);
	};
	console.log(auth);
	return (
		<div className="text-center mt-5">
			{auth ? (
				<Redirect to="/demo" />
			) : (
				<form onSubmit={e => onSubmit(e)}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail" className="form-label">
							email
						</label>
						<input
							type="text"
							className="form-control"
							id="exampleInputEmail"
							aria-describedby="emailHelp"
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
						<div id="emailHelp" className="form-text">
							Well never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword" className="form-label">
							password
						</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="mb-3 form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1" />
						<label className="form-check-label" htmlFor="exampleCheck1">
							Check me out
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			)}
		</div>
	);
};
