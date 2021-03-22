import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';
import Logo from './components/logo';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=da28d6fc`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];{
			if (favourites.includes(movie)== false){
				setFavourites(newFavouriteList);
				saveToLocalStorage(newFavouriteList);
			}
			
			else{
				alert("This movie is already in your Favorites")
			}
				
				
		}
		
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid '>
			<div className='row d-flex align-items-center mt-4 movie-app sizing'>
			<Logo/>
			<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row d-flex align-items-center mt-4 movie-app sizing'>
			
				<MovieListHeading heading='Search Results' />
				
			</div>
			<div className='row movie-app sizing'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4  movie-app sizing'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row movie-app sizing'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;