import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import Photo from "./components/Photo";
import Navbar from "./components/Navbar";

const clientID = `?client_id=${process.env.REACT_APP_API_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	//Loading
	const [loading, setLoading] = useState(false);

	//Photos
	const [photos, setPhotos] = useState([]);

	//Pages
	const [page, setPage] = useState(1);

	//Query
	const [query, setQuery] = useState("");

	const callUnsplashAPI = async () => {
		setLoading(true);
		let url;
		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;

		if (query) {
			url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
		} else {
			url = `${mainUrl}${clientID}${urlPage}`;
		}

		try {
			const resp = await fetch(url);
			const data = await resp.json();
			setPhotos((oldPhoto) => {
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhoto, ...data.results];
				} else {
					return [...oldPhoto, ...data];
				}
			});
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		callUnsplashAPI();
	}, [page]);

	//Infinite Scroll
	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				(!loading && window.innerHeight + window.scrollY) >=
				document.body.scrollHeight - 2
			) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});

		return () => window.removeEventListener("scroll", event);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		callUnsplashAPI();
	};

	return (
		<main>
			<Navbar message="#100DaysOfCode" />
			<section className="search">
				<form className="search-form">
					<input
						type="text"
						placeholder="Search"
						className="form-input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" className="submit-btn" onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className="photos">
				<div className="photos-center">
					{photos.map((image, index) => (
						<Photo key={index} {...image} />
					))}
				</div>
			</section>
		</main>
	);
}

export default App;
