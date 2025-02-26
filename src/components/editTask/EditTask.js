import { useState, useEffect, useContext } from "react";
import "./EditTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";
import { LanguageContext } from "../locales/LanguageContext";

const EditTask = ({
	id,
	task: initialTask,
	description: initialDescription,
	importance: initialImportance,
	labels: initialLabels,
	time: initialTime,
	onSaveTask,
	cancelEdit,
	allLabels,
	tasks,
	addLabel,
	updateStateApp,
	completedTasks,
}) => {
	const { getTranslation } = useContext(LanguageContext);

	const [task, setTask] = useState(initialTask);
	const [description, setDescription] = useState(initialDescription);
	const [importance, setImportance] = useState(initialImportance);
	const [chosenLabels, setChosenLabels] = useState(initialLabels);
	const [time, setTime] = useState(initialTime);
	const [isOpenImportance, setIsOpenImportance] = useState(false);
	const [isOpenLabels, setIsOpenLabels] = useState(false);
	const [currentLabel, setCurrentLabel] = useState("");

	useEffect(() => {
		const updatedTask = {
			id,
			task: task.trim(),
			description,
			importance,
			labels: chosenLabels,
			time,
		};

		if (
			(task.trim() && task !== initialTask) ||
			description !== initialDescription ||
			importance !== initialImportance ||
			chosenLabels.length !== initialLabels.length ||
			time !== initialTime
		) {
			onSaveTask(updatedTask);
		}
	}, [
		task,
		description,
		importance,
		chosenLabels,
		time,
		id,
		initialTask,
		initialDescription,
		initialImportance,
		initialLabels.length,
		initialTime,
		onSaveTask,
	]);

	const handleImportanceChange = (value) => {
		setImportance(value);
		setIsOpenImportance(false);
	};

	const toggleDropdown = (dropdown) => {
		if (dropdown === "isOpenImportance") {
			setIsOpenImportance((prev) => !prev);
		}
		if (dropdown === "isOpenLabels") {
			setIsOpenLabels((prev) => !prev);
		}
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

	return (
		<>
			<div className='edit-task__overlay'></div>
			<div className='edit-task__form'>
				<input
					type='text'
					className='edit-task__form__input'
					value={task}
					onChange={(e) => setTask(e.target.value)}
					placeholder={getTranslation("taskName")}
				/>
				<textarea
					className='edit-task__form__textarea'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder={getTranslation("description")}
				/>
				<div className='edit-task__form__importance'>
					<div
						className={`custom-select ${isOpenImportance ? "active" : ""}`}
						onClick={() => toggleDropdown("isOpenImportance")}>
						<div className='selected-option'>
							{options.find((option) => option.value === importance)?.icon}
							<span>{getTranslation(`${importance.toLowerCase()}`)}</span>
						</div>
						<ul className='dropdown-list'>
							{options.map((option) => (
								<li
									key={option.value}
									onClick={() => handleImportanceChange(option.value)}
									className='dropdown-item'>
									{option.icon}
									<span>{option.label}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<Time
					updateState={setTime}
				/>
				<Label
					tasks={tasks}
					labels={initialLabels}
					updateStateApp={updateStateApp}
					addLabel={addLabel}
					currentLabel={currentLabel}
					allLabels={allLabels}
					chosenLabels={chosenLabels}
					updateState={setChosenLabels}
					isOpenLabels={isOpenLabels}
					completedTasks={completedTasks}
				/>
				<div className='edit-task__form__buttons'>
					<button
						className='edit-task__form__buttons__add'
						onClick={cancelEdit}
						style={{ padding: "10px 30px" }}>
						Exit
					</button>
				</div>
			</div>
		</>
	);
};

export default EditTask;
