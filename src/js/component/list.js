import React, { useState, useEffect } from "react";

export const List = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);

	// useEffect(() => {
	// 	console.log(input);
	// 	console.log(list);
	// }, [list]);

	const handleClick = () => {
		let newList = [...list, input];
		setList(newList);
	};

	// const remove = () => {
	// 	console.log(list);

	// 	for (let a = 0; a < list.length; a++) {
	// 		if (list[a] === liGen.elem) {
	// 			list.splice(a, 1);
	// 		}
	// 	}

	// 	console.log(list);
	// };

	// const deleteIt = () => {
	// 		list.splice(i, 1);
	// 		console.log(list);
	// };

	let liGen = list.map((elem, i) => {
		//Genera la lista

		return (
			<li key={i}>
				<div className="container-flex">
					<div className="col-10 d-inline-block">{elem}</div>
					<div className="col-1 d-inline-block">
						<button
							type="button"
							className="btn btn-none text-danger">
							<i className="fas fa-times"></i>
						</button>
					</div>
				</div>
			</li>
		);
	});

	const taskCount = () => {
		if (list.length == 0) {
			return "No tasks... Free?";
		} else {
			return list.length + " remaining tasks";
		}
	};

	return (
		<div className="myList">
			<div>
				<input
					className="myInput"
					onChange={e => setInput(e.target.value)}
				/>
				<button className="myButton" onClick={handleClick}>
					Add To Do
				</button>
			</div>

			<div className="lista">
				<ul>
					<div>{liGen}</div>
					<div></div>
				</ul>
			</div>
			<div className="tasks">{taskCount()}</div>
		</div>
	);
};
