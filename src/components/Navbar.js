import React from "react";

const Navbar = ({ message }) => {
	return (
		<nav className="navbar navbar-dark bg-dark d-flex justify-content-center align-items-center  px-5">
			<h2 className="navbar-brand m-1">{message}: Unsplash App</h2>
		</nav>
	);
};

export default Navbar;
