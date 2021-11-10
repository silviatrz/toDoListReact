import React, { useState } from "react";

const ToDo = () => {
	const initialTasks = [
		{ id: 0, label: "Make the bed", show: false },
		{ id: 1, label: "Wash my hands", show: false },
		{ id: 2, label: "Eat", show: false },
		{ id: 3, label: "Walk the dog", show: false }
	];

	const [tasks, setTasks] = useState(initialTasks);
	const [inputValue, setInputValue] = useState("");

	const checkSubmit = inputValue => {
		for (let task of tasks) {
			if (inputValue.toLowerCase() === task.label.toLowerCase()) {
				setInputValue("");
				return false;
			}
		}
		return true;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (checkSubmit(inputValue)) {
			setTasks(ls => [
				...ls,
				{ id: tasks.length, label: inputValue, show: false }
			]);
			setInputValue("");
		}
	};

	const handleMouseEnter = n => {
		let items = [...tasks];
		for (let i in items) {
			if (items[i].id == n) {
				items[i].show = true;
			}
		}
		setTasks(items);
	};

	const handleMouseLeave = n => {
		let items = [...tasks];
		for (let i in items) {
			if (items[i].id == n) {
				items[i].show = false;
			}
		}
		setTasks(items);
	};

	const deleteElement = id => {
		const newList = tasks.filter(task => task.id !== id);
		setTasks(newList);
	};

	return (
		<div className="border border-white rounded">
			<div className="bg-white">
				<form
					className="form-inline d-inline-flex py-1"
					onSubmit={handleSubmit}>
					<input
						type="text"
						className="text-center form-control border border-white"
						placeholder={
							tasks.length > 0
								? "What needs to be done?"
								: "No tasks, add a task"
						}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<button
						className="px-3 add-button rounded-pill bg-warning text-white"
						type="submit"
						disabled={inputValue ? "" : "disabled"}>
						Add
					</button>
				</form>
			</div>
			<ul className="list-unstyled">
				{tasks.map(task => (
					<li
						className="card d-flex flex-row justify-content-between p-2 m-2"
						key={task.id}
						onMouseEnter={handleMouseEnter.bind(task, task.id)}
						onMouseLeave={handleMouseLeave.bind(task, task.id)}>
						{task.label}

						<span onClick={deleteElement.bind(task, task.id)}>
							{task.show && <i className="fas fa-times"></i>}
						</span>
					</li>
				))}
			</ul>
			<p className="card-text fs-6 text-white">
				{tasks.length} item{tasks.length > 1 ? "s" : ""} left
			</p>
		</div>
	);
};

export default ToDo;
