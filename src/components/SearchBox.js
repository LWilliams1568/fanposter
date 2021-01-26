import React from 'react';
import '../App.css';


const SearchBox = (props) => {
	return (
		<div className='col col-4'>
		
		<br></br>
			<input
				className='form-control searchBar' 
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
			></input>
		
		</div>
	);
};

export default SearchBox;
