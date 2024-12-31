import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import Filters from "../../pages/filter/Filters";
import Labels from "../../pages/labels/Labels";

import "./App.scss";

class App extends Component {
	state = {
		menuOpen: false,
		countTasks: 4,
		addTask: false,
		task: "",
		description: "",
		importance: "Priority",
		tasks: [
			{
				id: Date.now() + 1,
				task: "🕋 Read book about Tawhid",
				description: "read the chapter 45",
				importance: "Medium",
				labels: ["Religion", "Self-Development"],
			},
			{
				id: Date.now() + 2,
				task: "💻 Programming",
				description: "Work with web-site",
				importance: "High",
				labels: ["Work", "Finance", "Job"],
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
				labels: ["Routine"],
			},
		],
		completedTasks: [],
		completedTasksCount: 0,
		addLabel: false,
		allLabels: [
			"Work",
			"Finance",
			"Job",
			"Religion",
			"Self-Development",
			"Routine",
		],
		currentLabel: "",
		chosenLabels: [],
	};

	updateStateBool = (prop, bool) => {
		this.setState(() => ({ [prop]: bool }));
	};

	updateStateEvent = (prop, event) => {
		if (typeof this.state[prop] === "string") {
			this.setState({ [prop]: event.target.value });
		} else if (
			typeof this.state[prop] === "object" &&
			prop !== "chosenLabels"
		) {
			this.setState({ [prop]: [...this.state[prop], event] });
		} else if (
			typeof this.state[prop] === "object" &&
			prop === "chosenLabels"
		) {
			this.setState({ [prop]: event });
		}
	};

	updateStatePriority = (value) => {
		this.setState({ importance: value });
	};

	onTask = () => {
		const { task, description, tasks, importance, chosenLabels } = this.state;

		if (!task.trim()) {
			alert("Task name cannot be empty.");
			return;
		}

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
			labels: [...chosenLabels],
		};

		this.setState({
			tasks: [...tasks, newTask],
			task: "",
			description: "",
			countTasks: tasks.length + 1,
			addTask: false,
			addLabel: false,
			currentLabel: "",
			chosenLabels: [],
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

	onOpenFilterLabel = (label, clazz) => {
		this.setState((prevState) => {
			const isSameLabel = prevState.openLabel === label;

			// Закрытие всех меток
			const allTasks = document.querySelectorAll(`.${clazz}`);
			allTasks.forEach((task) => {
				task.style.maxHeight = "0px";
			});

			// Открытие текущей метки, если она не совпадает с предыдущей
			const content = document.querySelector(`.${clazz}-${label}`);
			if (content && !isSameLabel) {
				content.style.maxHeight = `${content.scrollHeight * 1}px`;
			}

			return {
				openLabel: isSameLabel ? null : label, // Закрываем, если метка совпадает
			};
		});
	};

	render() {
		const {
			menuOpen,
			tasks,
			completedTasks,
			countTasks,
			addTask,
			completedTasksCount,
			addLabel,
			allLabels,
			currentLabel,
			chosenLabels,
		} = this.state;

		return (
			<div className='App'>
				<BrowserRouter basename='/todolist'>
					<Routes>
						<Route
							path='/'
							element={
								<Tasks
									menuOpen={menuOpen}
									countTasks={countTasks}
									addTask={addTask}
									tasks={tasks}
									addLabel={addLabel}
									allLabels={allLabels}
									currentLabel={currentLabel}
									chosenLabels={chosenLabels}
									updateStateEvent={this.updateStateEvent}
									updateStatePriority={this.updateStatePriority}
									onTask={this.onTask}
									onActionWithTask={this.onActionWithTask}
									updateStateBool={this.updateStateBool}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
								/>
							}
						/>
						<Route
							path='/completed'
							element={
								<Completed
									menuOpen={menuOpen}
									completedTasks={completedTasks}
									completedTasksCount={completedTasksCount}
									updateStateBool={this.updateStateBool}
									onActionWithTask={this.onActionWithTask}
								/>
							}
						/>
						<Route
							path='/filter'
							element={
								<Filters
									menuOpen={menuOpen}
									countTasks={countTasks}
									tasks={tasks}
									addLabel={addLabel}
									allLabels={allLabels}
									currentLabel={currentLabel}
									chosenLabels={chosenLabels}
									updateStateBool={this.updateStateBool}
									updateStateEvent={this.updateStateEvent}
									onActionWithTask={this.onActionWithTask}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									onOpenFilterLabel={this.onOpenFilterLabel}
								/>
							}
						/>

						<Route
							path='/labels'
							element={
								<Labels
									menuOpen={menuOpen}
									countTasks={countTasks}
									tasks={tasks}
									allLabels={allLabels}
									addLabel={addLabel}
									currentLabel={currentLabel}
									chosenLabels={chosenLabels}
									updateStateEvent={this.updateStateEvent}
									updateStateBool={this.updateStateBool}
									onActionWithTask={this.onActionWithTask}
									editTaskFunc={this.editTaskFunc}
									onSaveTask={this.onSaveTask}
									onOpenFilterLabel={this.onOpenFilterLabel}
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
