import React, { useState, useEffect, useRef, useContext } from "react";
import "./AddTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";
import { LanguageContext } from "../locales/LanguageContext";
import MyContext from "../context/Context";

const AddTask = ({ onTask, completedTasks }) => {
	const { getTranslation } = useContext(LanguageContext);
	const { tasks, allLabels, updateStateApp } = useContext(MyContext);

	const [addTask, setAddTask] = useState(false);
	const [task, setTask] = useState("asdfasfasdf");
	const [description, setDescription] = useState("");
	const [importance, setImportance] = useState("Priority");
	const [isOpen, setIsOpen] = useState(false);
	const [chosenLabels, setChosenLabels] = useState([]);
	const [currentLabel, setCurrentLabel] = useState("");
	const [time, setTime] = useState("");
	const [resetSignal, setResetSignal] = useState(0);

	const inputTaskName = useRef(null);
	const textarea = useRef(null);

	useEffect(() => {
		if (addTask) {
			inputTaskName.current.focus();
		}
	}, [addTask]);

	useEffect(() => {
		if (tasks.length > 0 || allLabels.length > 0) {
			updateStateApp("tasks", tasks);
		}
	}, [tasks, allLabels, updateStateApp]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && document.activeElement === inputTaskName.current) {
			e.preventDefault();
			textarea.current.focus();
		}
	};

	const defaultState = () => {
		setAddTask(true);
		setTask("");
		setDescription("");
		setImportance("Priority");
		setChosenLabels([]);
		setTime("");
		setResetSignal((prev) => prev + 1);
		textarea.current.value = "";
		inputTaskName.current.value = "";
		inputTaskName.current.focus();
	};

	const autoResizeTextarea = () => {
		textarea.current.style.height = "auto";
		textarea.current.style.height = `${textarea.current.scrollHeight}px`;
	};

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const options = [
		{
			value: "Priority",
			label: getTranslation("priority"),
			icon: <Flag theme='#CDCDCD' />,
		},
		{
			value: "Low",
			label: getTranslation("low"),
			icon: <Flag theme='#5390F5' />,
		},
		{
			value: "Medium",
			label: getTranslation("medium"),
			icon: <Flag theme='orange' />,
		},
		{
			value: "High",
			label: getTranslation("high"),
			icon: <Flag theme='#FF6247' />,
		},
	];

	// useEffect(() => {
	// 	console.log(chosenLabels)
	// }, [chosenLabels])

	return (
		<div className='add-task'>
			{addTask ? (
				<>
					<div className='add-task__overlay'></div>
					<div className='add-task__form'>
						<input
							type='text'
							className='add-task__form__input'
							placeholder={getTranslation("taskName")}
							onChange={(e) => setTask(e.target.value)}
							ref={inputTaskName}
							onKeyDown={handleKeyDown}
							value={task}
						/>
						<textarea
							className='add-task__form__textarea'
							placeholder={getTranslation("description")}
							onInput={autoResizeTextarea}
							onChange={(e) => setDescription(e.target.value)}
							ref={textarea}
						/>
						<div className='add-task__form__importance'>
							<div
								className={`custom-select ${isOpen ? "active" : ""}`}
								onClick={toggleDropdown}>
								<div className='selected-option'>
									{options.find((option) => option.value === importance)?.icon}
									<span>{getTranslation(importance.toLowerCase())}</span>
								</div>
								<ul className='dropdown-list'>
									{options.map((option) => (
										<li
											key={option.value}
											onClick={() => {
												setImportance(option.value);
												setIsOpen(false);
											}}
											className='dropdown-item'>
											{option.icon}
											<span>{option.label}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
						<Time
							updateState={(prop, value) => setTime(value)}
							resetSignal={resetSignal}
						/>
						<Label
							currentLabel={currentLabel}
							setCurrentLabel={setCurrentLabel}
							chosenLabels={chosenLabels}
							setChosenLabels={setChosenLabels}
							completedTasks={completedTasks}
						/>
						<div className='add-task__form__buttons'>
							<button
								className='add-task__form__buttons__cancel'
								onClick={() => setAddTask(false)}>
								{getTranslation("cancel")}
							</button>
							<button
								className='add-task__form__buttons__add'
								onClick={() => {
									onTask({ task, description, importance, chosenLabels, time });
									defaultState();
								}}>
								{getTranslation("addTask")}
							</button>
						</div>
					</div>
				</>
			) : (
				<div
					className='add-task__button'
					onClick={() => setAddTask(true)}>
					<span></span>
					<p>{getTranslation("addTask")}</p>
				</div>
			)}
		</div>
	);
};

export default AddTask;
