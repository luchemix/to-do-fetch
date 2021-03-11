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

	const deleteIt = i => {
		setList(
			list.filter((list, index) => {
				return index != i;
			})
		);
	};

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
					placeholder="Add a new task"
				/>
				<button className="myButton" onClick={handleClick}>
					Add
				</button>
			</div>

			<div className="lista">
				<ul>
					<div>
						{list.map((elem, i) => {
							return (
								<li key={i}>
									<div className="container-flex">
										<div className="col-10 d-inline-block">
											{elem}
										</div>
										<div className="col-1 d-inline-block">
											<button
												onClick={e => deleteIt(i)}
												type="button"
												className="btn btn-none text-danger">
												<i className="fas fa-times"></i>
											</button>
										</div>
									</div>
								</li>
							);
						})}
					</div>
					<div></div>
				</ul>
			</div>

			<div className="container-flex">
				<div className="col-3 d-inline-block float-left">
					<button
						id="deleteAll"
						type="button"
						className="btn-sm btn-warning text-danger"
						data-toggle="tooltip"
						data-placement="auto"
						title="Delete All"
						onClick={e => setList([])}>
						<i className="far fa-trash-alt" id="trash"></i>
					</button>
				</div>
				<div id="tasks" className="col-9 d-inline-block text-light">
					{taskCount()}
				</div>
			</div>
		</div>
	);
};
