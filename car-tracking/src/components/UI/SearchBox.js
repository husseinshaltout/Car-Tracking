import React, { useState } from "react";
import classes from "./SearchBox.module.css";

function SearchBox(props) {
	const [searchValue, setSearchValue] = useState("");

	const inputChangeHandler = (event) => {
		setSearchValue(event.target.value);
		props.onSearch(event.target.value);
	};

	return (
		<div className={classes["search-box__container"]}>
			<form className={classes["search-box"]}>
				<input
					className={classes["search__input"]}
					type="text"
					name="search"
					placeholder="Search..."
					value={searchValue}
					onChange={inputChangeHandler}
				/>
			</form>
		</div>
	);
}

export default SearchBox;
