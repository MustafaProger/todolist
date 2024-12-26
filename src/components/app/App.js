import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import FiltersLabels from "../../pages/filtersLabels/FiltersLabels";

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
			{
				id: 4,
				task: "🗑️ Throw out the trash",
				description: "",
				importance: "Priority",
			},
		],
		completedTasks: [],
		completedTasksCount: 0,
		editingTask: null,
		filtered: [],
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

	onActionWithTask = (id, action) => {
		this.setState(({ tasks, completedTasks }) => {
			const newArr = tasks.filter((item) => item.id !== id);
			const completedTask = tasks.find((item) => item.id === id);
			const removeCompletedTask = completedTasks.filter(
				(item) => item.id !== id
			);
			const returnCompletedTask = completedTasks.filter(
				(item) => item.id === id
			);

			if (action === "remove") {
				return {
					tasks: newArr,
					countTasks: tasks.length - 1,
				};
			} else if (action === "completed") {
				return {
					tasks: newArr,
					completedTasks: [...completedTasks, completedTask],
					countTasks: tasks.length - 1,
					completedTasksCount: completedTasks.length + 1,
				};
			} else if (action === "remove-completed") {
				return {
					completedTasks: removeCompletedTask,
					completedTasksCount: completedTasks.length - 1,
				};
			} else if (action === "refresh") {
				return {
					tasks: [...tasks, ...returnCompletedTask],
					countTasks: tasks.length + 1,
					completedTasks: removeCompletedTask,
					completedTasksCount: completedTasks.length - 1,
				};
			}
		});
	};

	editTaskFunc = (id, updatedTask) => {
		// Логика обновления задачи в состоянии родительского компонента
		const updatedTasks = this.state.tasks.map((task) =>
			task.id === id ? { ...task, ...updatedTask } : task
		);
		this.setState({ tasks: updatedTasks });
	};

	onSaveTask = (updatedTask) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map((task) =>
				task.id === updatedTask.id ? { ...task, ...updatedTask } : task
			),
		}));
	};

	cancelEdit = () => {
		this.setState({ editingTask: null });
	};

	render() {
		const {
			menuOpen,
			tasks,
			completedTasks,
			countTasks,
			addTask,
			completedTasksCount,
			editingTask,
		} = this.state;

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
									onActionWithTask={this.onActionWithTask}
									updateMenuState={this.updateMenuState}
									menuOpen={menuOpen}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									editingTask={editingTask}
								/>
							}
						/>
						<Route
							path='/completed'
							element={
								<Completed
									onActionWithTask={this.onActionWithTask}
									completedTasks={completedTasks}
									completedTasksCount={completedTasksCount}
									updateMenuState={this.updateMenuState}
									menuOpen={menuOpen}
								/>
							}
						/>
						<Route
							path='/filters-labels'
							element={
								<FiltersLabels
									tasks={tasks}
									countTasks={countTasks}
									menuOpen={menuOpen}
									updateMenuState={this.updateMenuState}
									onActionWithTask={this.onActionWithTask}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									editingTask={editingTask}
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
