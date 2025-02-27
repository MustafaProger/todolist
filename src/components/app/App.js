import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "../../pages/tasks/Tasks";
import Completed from "../../pages/completed/Completed";
import Filters from "../../pages/filters/Filters";
import Labels from "../../pages/labels/Labels";
import Menu from "../menu/Menu";

import MyContext from "../context/Context";
import LanguageProvider from "../locales/LanguageContext";
import PortalTaskAddedSuccess from "../portal-taskAdded/PortalTaskAddedSuccess";

import "./App.scss";

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
			if (prop === "allLabels") setAllLabels(value);
			if (prop === "tasks") setTasks(value);
			if (prop === "term") setTerm(value);
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
				completedTasks,
				onSaveTask,
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
						/>
						<Routes>
							<Route
								path='/'
								element={
									<Tasks
										tasks={tasks}
										onTask={onTask}
										search={search}
									/>
								}
							/>
							<Route
								path='/completed'
								element={
									<Completed
										completedTasksCount={completedTasksCount}
										updateStateApp={updateStateApp}
									/>
								}
							/>
							<Route
								path='/filter'
								element={<Filters />}
							/>

							<Route
								path='/labels'
								element={<Labels search={search} />}
							/>
						</Routes>
					</LanguageProvider>
				</BrowserRouter>
			</div>
		</MyContext.Provider>
	);
};

export default App;
