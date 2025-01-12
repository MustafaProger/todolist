import { Component } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import Filters from "../../pages/filter/Filters";
import Labels from "../../pages/labels/Labels";

import LanguageProvider from "../locales/LanguageContext";
import PortalTaskAddedSuccess from "../portal-taskAdded/PortalTaskAddedSuccess";

import "./App.scss";
import Menu from "../menu/Menu";

class App extends Component {
	state = {
		menuOpen: false,
		tasks: [],
		tasksCount: 0,
		completedTasks: [],
		completedTasksCount: 0,
		allLabels: [
			"Finance",
			"Job",
			"Religion",
			"Self-Development",
			"Routine",
			"Health",
			"Education",
			"Relaxation",
		],
		term: "",
		theme: "light",
		language: "en",
		showPortal: false,
		taskMessage: null,
	};

	componentDidMount() {
		const savedState = JSON.parse(localStorage.getItem("appState"));
		if (savedState) {
			this.setState(savedState);
		}

		// Проверка задач на удаление каждые 10 минут
		this.interval = setInterval(() => {
			const { completedTasks } = this.state;
			const now = Date.now();
			const filteredTasks = completedTasks.filter(
				(task) => now - task.completedAt < 24 * 60 * 60 * 1000 // Задачи, завершенные менее 24 часов назад
			);
			this.setState({ completedTasks: filteredTasks });
		}, 10 * 60 * 1000); // каждые 10 минут
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			menuOpen,
			tasksCount,
			tasks,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
			language,
		} = this.state;

		const stateToSave = {
			menuOpen,
			tasksCount,
			tasks,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
			language,
		};

		if (JSON.stringify(prevState) !== JSON.stringify(stateToSave)) {
			localStorage.setItem("appState", JSON.stringify(stateToSave));
		}
		const themeColorMeta = document.querySelector('meta[name="theme-color"]');

		if (themeColorMeta) {
			if (this.state.theme === "dark") {
				themeColorMeta.setAttribute("content", "#191919");
			} else {
				themeColorMeta.setAttribute("content", "tomato");
			}
		}
	}

	updateStateApp = (prop, value) => {
		if (prop === "allLabels" && typeof value === "string") {
			this.setState({ [prop]: [...this.state[prop], value] });
		} else {
			this.setState(() => ({ [prop]: value }));
		}
	};

	onTask = (stateAddTask) => {
		const { task, description, importance, chosenLabels, time } = stateAddTask;

		if (!task.trim()) {
			alert("Task name cannot be empty.");
			return;
		} else if (time === "Invalid Date") {
			alert("Enter the time correctly");
			return;
		} else {
			this.setState({ showPortal: true, taskMessage: task });
		}

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
			labels: [...chosenLabels],
			time,
		};

		this.setState((prevState) => ({
			tasks: [...this.state.tasks, newTask],
			tasksCount: prevState.tasks.length + 1,
		}));

		setTimeout(() => {
			this.setState({ showPortal: false, taskMessage: null });
		}, 2000);
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
					tasksCount: tasks.length - 1,
				};
			} else if (action === "completed") {
				const taskWithTimestamp = {
					...completedTask,
					completedAt: Date.now(),
				};
				return {
					tasks: newArr,
					completedTasks: [...completedTasks, taskWithTimestamp],
					tasksCount: tasks.length - 1,
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
					tasksCount: tasks.length + 1,
					completedTasks: removeCompletedTask,
					completedTasksCount: completedTasks.length - 1,
				};
			}
		});
	};

	onSaveTask = (updatedTask) => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map((task) =>
				task.id === updatedTask.id ? { ...task, ...updatedTask } : task
			),
		}));
	};

	updateTask = () => {
		this.setState(({ tasks }) => ({
			tasks: tasks.map((task) => {
				return task;
			}),
		}));
	};

	onOpenFilterLabel = (label, clazz) => {
		this.setState((prevState) => {
			const isSameLabel = prevState.openLabel === label;

			const allTasks = document.querySelectorAll(`.${clazz}`);
			allTasks.forEach((task) => {
				task.style.maxHeight = "0px";
			});

			const content = document.querySelector(`.${clazz}-${label}`);
			if (content && !isSameLabel) {
				content.style.maxHeight = `${content.scrollHeight * 1}px`;
			}

			return {
				openLabel: isSameLabel ? null : label,
			};
		});
	};

	search = (tasks, nameSearch) => {
		if (this.state.term.length === 0) return tasks;

		if (nameSearch === "task") {
			return tasks.filter((item) => {
				return (
					item[nameSearch]
						.toLowerCase()
						.indexOf(this.state.term.toLowerCase()) > -1
				);
			});
		} else if (nameSearch === "label") {
			return tasks.filter(
				(item) => item.toLowerCase().indexOf(this.state.term.toLowerCase()) > -1
			);
		}
	};

	render() {
		const {
			menuOpen,
			tasks,
			tasksCount,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
			language,
		} = this.state;

		return (
			<div className='App'>
				{this.state.showPortal && (
					<PortalTaskAddedSuccess>
						<p>
							Task «<strong>{this.state.taskMessage}</strong>» added
						</p>
					</PortalTaskAddedSuccess>
				)}
				<BrowserRouter basename='/todolist'>
					<LanguageProvider
						updateStateApp={this.updateStateApp}
						language={language}>
						<Menu
							updateStateApp={this.updateStateApp}
							menuOpen={menuOpen}
							theme={theme}
						/>
						<Routes>
							<Route
								path='/'
								element={
									<Tasks
										menuOpen={menuOpen}
										tasksCount={tasksCount}
										tasks={tasks}
										allLabels={allLabels}
										onTask={this.onTask}
										onActionWithTask={this.onActionWithTask}
										updateStateApp={this.updateStateApp}
										onSaveTask={this.onSaveTask}
										search={this.search}
										completedTasks={completedTasks}
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
										updateStateApp={this.updateStateApp}
										onActionWithTask={this.onActionWithTask}
									/>
								}
							/>
							<Route
								path='/filter'
								element={
									<Filters
										menuOpen={menuOpen}
										tasksCount={tasksCount}
										tasks={tasks}
										allLabels={allLabels}
										updateStateApp={this.updateStateApp}
										onActionWithTask={this.onActionWithTask}
										onSaveTask={this.onSaveTask}
										onOpenFilterLabel={this.onOpenFilterLabel}
										completedTasks={completedTasks}
									/>
								}
							/>

							<Route
								path='/labels'
								element={
									<Labels
										menuOpen={menuOpen}
										tasksCount={tasksCount}
										tasks={tasks}
										allLabels={allLabels}
										updateStateApp={this.updateStateApp}
										onActionWithTask={this.onActionWithTask}
										onSaveTask={this.onSaveTask}
										onOpenFilterLabel={this.onOpenFilterLabel}
										search={this.search}
										completedTasks={completedTasks}
									/>
								}
							/>
						</Routes>
					</LanguageProvider>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
