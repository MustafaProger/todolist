import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import Filters from "../../pages/filter/Filter";
import Lables from "../../pages/labels/Labels";

import "./App.scss";

class App extends Component {
	state = {
		menuOpen: false,
		countTasks: 4,
		addTask: true,
		task: "",
		description: "",
		importance: "Priority",
		tasks: [
			{
				id: Date.now(),
				task: "🕋 Read book about Tawhid",
				description: "read the chapter 45",
				importance: "Medium",
				labels: [],
			},
			{
				id: Date.now() + 2,
				task: "💻 Programming",
				description: "Work with web-site",
				importance: "High",
				labels: [],
			},
			{
				id: Date.now() + 3,
				task: "🏫 College",
				description: "",
				importance: "Low",
				labels: [],
			},
			{
				id: Date.now() + 4,
				task: "🗑️ Throw out the trash",
				description: "",
				importance: "Priority",
				labels: [],
			},
		],
		completedTasks: [],
		completedTasksCount: 0,
		editingTask: null,
		addLabel: true,
		allLabels: [],
		currentLabel: 'a'
	};

	updateStateBool = (prop, bool) => {
		this.setState(() => ({ [prop]: bool }));
	};

	// updateStateEvent = (prop, event) => {
	// 	this.setState({ [prop]: event.target.value });
	// 	console.log(typeof this.state[prop]);
	// };

	updateStateEvent = (prop, event) => {
		if (typeof this.state[prop] === "string") {
			this.setState({ [prop]: event.target.value });

		} else if (typeof this.state[prop] === "object") {
			this.setState({ [prop]: [...this.state[prop], event] });
		}

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
			addLabel,
			allLabels,
			currentLabel
		} = this.state;

		return (
			<div className='App'>
				<BrowserRouter basename='/todolist'>
					<Routes>
						<Route
							path='/'
							element={
								<Tasks
									tasks={tasks}
									countTasks={countTasks}
									addTask={addTask}
									updateStateEvent={this.updateStateEvent}
									updateStatePriority={this.updateStatePriority}
									onTask={this.onTask}
									onActionWithTask={this.onActionWithTask}
									updateStateBool={this.updateStateBool}
									menuOpen={menuOpen}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									editingTask={editingTask}
									addLabel={addLabel}
									allLabels={allLabels}
									currentLabel={currentLabel}
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
									updateStateBool={this.updateStateBool}
									menuOpen={menuOpen}
								/>
							}
						/>
						<Route
							path='/filter'
							element={
								<Filters
									tasks={tasks}
									countTasks={countTasks}
									menuOpen={menuOpen}
									updateStateBool={this.updateStateBool}
									onActionWithTask={this.onActionWithTask}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									editingTask={editingTask}
								/>
							}
						/>

						<Route
							path='/labels'
							element={
								<Lables
									countTasks={countTasks}
									menuOpen={menuOpen}
									updateStateBool={this.updateStateBool}
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
