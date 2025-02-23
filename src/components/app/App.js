import { Component, useContext, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import Filters from "../../pages/filters/Filters";
import Labels from "../../pages/labels/Labels";
import Menu from "../menu/Menu";

import LanguageProvider from "../locales/LanguageContext";
import PortalTaskAddedSuccess from "../portal-taskAdded/PortalTaskAddedSuccess";

import "./App.scss";
import MyContext from "../context/Context";

const App = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState(0);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [completedTasksCount, setCompletedTasksCount] = useState(0);
	const [allLabels, setAllLabels] = useState([
		"Finance",
		"Job",
		"Religion",
		"Self-Development",
		"Routine",
		"Health",
		"Education",
		"Relaxation",
	]);
	const [term, setTerm] = useState("");
	const [theme, setTheme] = useState("light");
	const [language, setLanguage] = useState("en");
	const [showPortal, setShowPortal] = useState(false);
	const [taskMessage, setTaskMessage] = useState(null);

	useEffect(() => {
		const savedState = JSON.parse(localStorage.getItem("appState"));
		if (savedState) {
			setMenuOpen(savedState.menuOpen);
			setTasks(savedState.tasks);
			setTasksCount(savedState.tasksCount);
			setCompletedTasks(savedState.completedTasks);
			setCompletedTasksCount(savedState.completedTasksCount);
			setAllLabels(savedState.allLabels);
			setTheme(savedState.theme);
			setLanguage(savedState.language);
		}
	}, []);

	useEffect(() => {
		const stateToSave = {
			menuOpen,
			tasks,
			tasksCount,
			completedTasks,
			completedTasksCount,
			allLabels,
			theme,
			language,
		};
		localStorage.setItem("appState", JSON.stringify(stateToSave));

		const themeColorMeta = document.querySelector('meta[name="theme-color"]');
		if (themeColorMeta) {
			themeColorMeta.setAttribute(
				"content",
				theme === "dark" ? "#191919" : "tomato"
			);
		}
	}, [
		menuOpen,
		tasks,
		tasksCount,
		completedTasks,
		completedTasksCount,
		allLabels,
		theme,
		language,
	]);

	const updateStateApp = (prop, value) => {
		if (prop === "allLabels" && typeof value === "string") {
			setAllLabels((prev) => [...prev, value]);
		} else {
			if (prop === "theme") setTheme(value);
			if (prop === "language") setLanguage(value);
			if (prop === "menuOpen") setMenuOpen(value);
		}
	};

	const onTask = (stateAddTask) => {
		const { task, description, importance, chosenLabels, time } = stateAddTask;
		if (!task.trim() || time === "Invalid Date") {
			alert(
				!task.trim() ? "Task name cannot be empty." : "Enter the time correctly"
			);
			return;
		}

		setShowPortal(true);
		setTaskMessage(task);
		setTimeout(() => {
			setShowPortal(false);
			setTaskMessage(null);
		}, 2000);

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
			labels: [...chosenLabels],
			time,
		};
		setTasks((prev) => [...prev, newTask]);
		setTasksCount((prev) => prev + 1);
	};

	const onActionWithTask = (id, action) => {
		setTasks((prevTasks) => {
			console.log(id, action)
			console.log(prevTasks);
			const newArr = prevTasks.filter((item) => item.id !== id);
			const completedTask = prevTasks.find((item) => item.id === id);
			const newCompletedTasks = [...completedTasks];

			if (action === "remove") {
				setTasksCount((prevCount) => prevCount - 1);
				return newArr;
			} else if (action === "completed") {
				const taskWithTimestamp = { ...completedTask, completedAt: Date.now() };
				newCompletedTasks.push(taskWithTimestamp);
				setCompletedTasks(newCompletedTasks);
				setCompletedTasksCount((prevCount) => prevCount + 1);
				setTasksCount((prevCount) => prevCount - 1);
				return newArr;
			} else if (action === "remove-completed") {
				setCompletedTasks(newCompletedTasks.filter((item) => item.id !== id));
				setCompletedTasksCount((prevCount) => prevCount - 1);
				return newArr;
			} else if (action === "refresh") {
				newCompletedTasks.splice(newCompletedTasks.indexOf(completedTask), 1);
				setCompletedTasks(newCompletedTasks);
				setCompletedTasksCount((prevCount) => prevCount - 1);
				setTasks([...prevTasks, completedTask]);
				setTasksCount((prevCount) => prevCount + 1);
				return newArr;
			}

			return prevTasks;
		});
	};

	const onSaveTask = (updatedTask) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === updatedTask.id ? { ...task, ...updatedTask } : task
			)
		);
	};

	const updateTask = () => {
		setTasks((prevTasks) => [...prevTasks]);
	};

	// const onOpenFilterLabel = (label, clazz) => {
	// 	setOpenLabel((prevLabel) => {
	// 		const isSameLabel = prevLabel === label;

	// 		const allTasks = document.querySelectorAll(`.${clazz}`);
	// 		allTasks.forEach((task) => {
	// 			task.style.maxHeight = "0px";
	// 		});

	// 		const content = document.querySelector(`.${clazz}-${label}`);
	// 		if (content && !isSameLabel) {
	// 			content.style.maxHeight = `${content.scrollHeight}px`;
	// 		}

	// 		return isSameLabel ? null : label;
	// 	});
	// };

	const search = (tasks, nameSearch) => {
		if (!term.length) return tasks;

		if (nameSearch === "task") {
			return tasks.filter((item) =>
				item[nameSearch].toLowerCase().includes(term.toLowerCase())
			);
		} else if (nameSearch === "label") {
			return tasks.filter((item) =>
				item.toLowerCase().includes(term.toLowerCase())
			);
		}

		return tasks;
	};

	return (
		<MyContext.Provider
			value={{
				menuOpen,
				tasksCount,
				tasks,
				allLabels,
				onActionWithTask,
				updateStateApp,
			}}>
			<div className='App'>
				{showPortal && (
					<PortalTaskAddedSuccess>
						<p>
							Task «<strong>{taskMessage}</strong>» added
						</p>
					</PortalTaskAddedSuccess>
				)}
				<BrowserRouter basename='/todolist'>
					<LanguageProvider
						updateStateApp={updateStateApp}
						language={language}>
						<Menu
							updateStateApp={updateStateApp}
							menuOpen={menuOpen}
							theme={theme}
						/>
						<Routes>
							<Route
								path='/'
								element={
									<Tasks
										// menuOpen={menuOpen}
										// tasksCount={tasksCount}
										tasks={tasks}
										// allLabels={allLabels}
										onTask={onTask}
										// onActionWithTask={onActionWithTask}
										// updateStateApp={updateStateApp}
										onSaveTask={onSaveTask}
										search={search}
										completedTasks={completedTasks}
									/>
								}
							/>
							<Route
								path='/completed'
								element={
									<Completed
										// menuOpen={menuOpen}
										completedTasks={completedTasks}
										completedTasksCount={completedTasksCount}
										updateStateApp={updateStateApp}
										// onActionWithTask={onActionWithTask}
									/>
								}
							/>
							<Route
								path='/filter'
								element={
									<Filters
										// menuOpen={menuOpen}
										// tasksCount={tasksCount}
										// tasks={tasks}
										// allLabels={allLabels}
										// updateStateApp={updateStateApp}
										// onActionWithTask={onActionWithTask}
										onSaveTask={onSaveTask}
										completedTasks={completedTasks}
									/>
								}
							/>

							<Route
								path='/labels'
								element={
									<Labels
										// menuOpen={menuOpen}
										// tasksCount={tasksCount}
										// tasks={tasks}
										// allLabels={allLabels}
										// updateStateApp={updateStateApp}
										// onActionWithTask={onActionWithTask}
										onSaveTask={onSaveTask}
										// onOpenFilterLabel={onOpenFilterLabel}
										search={search}
										completedTasks={completedTasks}
									/>
								}
							/>
						</Routes>
					</LanguageProvider>
				</BrowserRouter>
			</div>
		</MyContext.Provider>
	);
};

export default App;
