import React from "react";
import { List } from "./list.js";

export let Remove = () => {
	let remove = () => {
		console.log(List.newAList);
	};

	return (
		<button type="button" className="btn btn-danger" onClick={remove}>
			<i className="far fa-window-close"></i>
		</button>
	);
};
