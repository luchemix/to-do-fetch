import React, { useState, useEffect } from "react";

export const List = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);

	useEffect(() => {
		fetching();
	}, []);

	const handleClick = () => {
		let newList = [...list, { label: input, done: false }];

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/luchemix", {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		})
			.then(response => response.json())
			.then(data => fetching())
			.catch(error => console.log("error", error));
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

	const fetching = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/luchemix", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}

				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				// console.log(data); //this will print on the console the exact object received from the server
				setList(
					data.map(item => {
						return { label: item.label, done: item.done };
					})
				);
			})
			.catch(error => {
				//error handling
				// console.log("ha ocurrido un error", error);
			});
	};
	fetching();

	const deleteTasks = () => {
		var raw = "";

		fetch("https://assets.breatheco.de/apis/fake/todos/user/luchemix", {
			method: "DELETE",
			body: raw,
			redirect: "follow"
		})
			.then(response => response.json())
			.then(data => setList([data]))
			.catch(error => console.log("error", error));
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
						{list.map((element, i) => {
							return (
								<li key={i}>
									<div className="container-flex">
										<div className="col-10 d-inline-block">
											{element.label}
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
						onClick={e => deleteTasks()}>
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
