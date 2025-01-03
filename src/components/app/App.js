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
		countTasks: 11,
		addTask: false,
		task: "",
		description: "",
		importance: "Priority",
		tasks: [
			{
				id: Date.now() + 9,
				task: "📚 College Assignment",
				description: "Complete math homework",
				importance: "High",
				labels: ["Education", "College"],
				time: "10:30",
			},
			{
				id: Date.now() + 10,
				task: "🧹 Clean Room",
				description: "Organize desk and vacuum floor",
				importance: "Medium",
				labels: ["Routine"],
				time: "13:00",
			},
			{
				id: Date.now() + 11,
				task: "🛒 Grocery Shopping",
				description: "Buy vegetables, milk, and bread",
				importance: "Low",
				labels: ["Routine", "Chores"],
				time: "16:00",
			},
			{
				id: Date.now() + 12,
				task: "📓 Read Book",
				description: "Finish the last chapter of 'Atomic Habits'",
				importance: "Medium",
				labels: ["Self-Development"],
				time: "18:30",
			},
			{
				id: Date.now() + 13,
				task: "📝 Plan Next Day",
				description: "Write tasks for tomorrow",
				importance: "High",
				labels: ["Planning"],
				time: "20:00",
			},
			{
				id: Date.now() + 14,
				task: "🚶 Evening Walk",
				description: "30-minute walk in the park",
				importance: "Low",
				labels: ["Health", "Relaxation"],
				time: "19:00",
			},
			{
				id: Date.now() + 15,
				task: "📱 Call Family",
				description: "Check in with parents and siblings",
				importance: "Priority",
				labels: ["Family"],
				time: "17:00",
			},
			{
				id: Date.now() + 16,
				task: "🌅 Fajr Prayer",
				description: "",
				importance: "High",
				labels: ["Religion"],
				time: "05:00",
			},
			{
				id: Date.now() + 17,
				task: "💼 Meeting with Team",
				description: "Discuss project updates and deadlines",
				importance: "High",
				labels: ["Work", "Job"],
				time: "11:00",
			},
			{
				id: Date.now() + 18,
				task: "🛏️ Change Bed Sheets",
				description: "",
				importance: "Low",
				labels: ["Routine", "Cleaning"],
				time: "14:30",
			},
			{
				id: Date.now() + 19,
				task: "🎮 Play Video Games",
				description: "Relax with friends online",
				importance: "Low",
				labels: ["Relaxation", "Fun"],
				time: "21:00",
			},
		],
		completedTasks: [
			{
				id: Date.now() + 5,
				task: "🏋️ Gym",
				description: "Complete a 45-minute workout",
				importance: "High",
				labels: ["Health", "Fitness"],
				time: "08:30",
			},
			{
				id: Date.now() + 6,
				task: "📖 Quran Study",
				description: "Memorize Surah Al-Mulk",
				importance: "Priority",
				labels: ["Religion", "Self-Development"],
				time: "06:00",
			},
			{
				id: Date.now() + 7,
				task: "📧 Check Emails",
				description: "Respond to work and personal emails",
				importance: "Medium",
				labels: ["Work", "Routine"],
				time: "09:00",
			},
			{
				id: Date.now() + 8,
				task: "🍳 Cook Breakfast",
				description: "Prepare omelette and coffee",
				importance: "Low",
				labels: ["Routine", "Food"],
				time: "07:15",
			},
		],
		completedTasksCount: 4,
		addLabel: false,
		allLabels: [
			"Work",
			"Finance",
			"Job",
			"Religion",
			"Self-Development",
			"Routine",
			"Health",
			"Fitness",
			"Education",
			"College",
			"Food",
			"Chores",
			"Planning",
			"Relaxation",
			"Family",
			"Cleaning",
			"Fun",
		],
		currentLabel: "",
		chosenLabels: [],
		time: "",
		term: "",
		theme: "light",
	};

	componentDidMount() {
		const savedState = JSON.parse(localStorage.getItem("appState"));
		if (savedState) {
			this.setState(savedState);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			menuOpen,
			countTasks,
			tasks,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
		} = this.state;

		const stateToSave = {
			menuOpen,
			countTasks,
			tasks,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
		};

		if (JSON.stringify(prevState) !== JSON.stringify(stateToSave)) {
			localStorage.setItem("appState", JSON.stringify(stateToSave));
		}
	}

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
		const { task, description, importance, chosenLabels, time } = this.state;

		if (!task.trim()) {
			alert("Task name cannot be empty.");
			return;
		} else if (time === "Invalid Date") {
			alert("Enter the time correctly");
			return;
		}

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
			labels: [...chosenLabels],
			time,
		};

		this.setState(
			(prevState) => ({
				tasks: [...prevState.tasks, newTask],
				task: "",
				description: "",
				countTasks: prevState.tasks.length + 1,
				addTask: false,
				addLabel: false,
				currentLabel: "",
				chosenLabels: [],
				time: "",
			})
			// this.updateLocalStorage
		);
	};

	onActionWithTask = (id, action) => {
		this.setState(
			({ tasks, completedTasks }) => {
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
			}
			// () => this.updateLocalStorage()
		);
	};

	editTaskFunc = (id, updatedTask) => {
		// Логика обновления задачи в состоянии родительского компонента
		const updatedTasks = this.state.tasks.map((task) =>
			task.id === id ? { ...task, ...updatedTask } : task
		);
		this.setState(
			{ tasks: updatedTasks }
			// () => this.updateLocalStorage()
		);
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
			completedTasks,
			countTasks,
			addTask,
			completedTasksCount,
			addLabel,
			allLabels,
			currentLabel,
			chosenLabels,
			theme,
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
									search={this.search}
									theme={theme}
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
									theme={theme}
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
									theme={theme}
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
									search={this.search}
									theme={theme}
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
