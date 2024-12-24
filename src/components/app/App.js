import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import AboutAuthor from "../../pages/aboutAuthor/AboutAuthor";

import "./App.scss";
import { Component } from "react";

class App extends Component {
	state = {
		menuOpen: false,
		countTasks: 3,
		addTask: false,
		task: "",
		description: "",
		importance: "Priority",
		tasks: [
			{
				id: 1,
				task: "🕋 Read book about Tawhid",
				description: "read the chapter 45",
				importance: "Medium",
			},
			{
				id: 2,
				task: "💻 Programming",
				description: "Work with web-site",
				importance: "High",
			},
			{
				id: 3,
				task: "🏫 College",
				description: "",
				importance: "Low",
			},
		],
		completedTasks: [],
		completedTasksCount: 0,
	};

	updateMenuState = (bool) => {
		this.setState({ menuOpen: bool });
	};

	onClickAddСancel = () => {
		this.setState(({ addTask }) => ({ addTask: !addTask }));
	};

	updateState = (prop, event) => {
		this.setState({ [prop]: event.target.value });
	};

	updateStatePriority = (value) => {
		this.setState({ importance: value });
	};

	onTask = () => {
		const { task, description, tasks, importance } = this.state;

		if (!task.trim()) {
			alert("Task name cannot be empty.");
			return;
		}

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
		};

		this.setState({
			tasks: [...tasks, newTask],
			task: "",
			description: "",
			countTasks: tasks.length + 1,
			addTask: false,
		});
	};

	removeOrCompletedTask = (id, removeOrCompleted) => {
		this.setState(({ tasks, completedTasks }) => {
			const newArr = tasks.filter((item) => item.id !== id);
			const completedTask = tasks.find((item) => item.id === id);

			if (removeOrCompleted === "remove") {
				return {
					tasks: newArr,
					countTasks: tasks.length - 1,
				};
			} else if (removeOrCompleted === "completed") {
				return {
					tasks: newArr,
					completedTasks: [...completedTasks, completedTask],
					countTasks: tasks.length - 1,
					completedTasksCount: completedTasks.length + 1,
				};
			}
		});
	};

	render() {
		const { menuOpen, tasks, completedTasks, countTasks, addTask, completedTasksCount } = this.state;

		return (
			<div className='App'>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={
								<Tasks
									tasks={tasks}
									countTasks={countTasks}
									addTask={addTask}
									onClickAddСancel={this.onClickAddСancel}
									updateState={this.updateState}
									updateStatePriority={this.updateStatePriority}
									onTask={this.onTask}
									removeOrCompletedTask={this.removeOrCompletedTask}
									updateMenuState={this.updateMenuState}
									menuOpen={menuOpen}
								/>
							}
						/>
						<Route
							path='/completed'
							element={
								<Completed
									removeOrCompletedTask={this.removeOrCompletedTask}
									completedTasks={completedTasks}
									completedTasksCount={completedTasksCount}
									updateMenuState={this.updateMenuState}
									menuOpen={menuOpen}
								/>
							}
						/>

						<Route
							path='/about-author'
							element={
								<AboutAuthor
									updateMenuState={this.updateMenuState}
									menuOpen={menuOpen}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
