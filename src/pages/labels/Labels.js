import React, { useContext, useState, useEffect } from "react";
import "./Labels.scss";
import Task from "../../components/task/Task";

import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";
import Search from "../../components/search/Search";

import { LanguageContext } from "../../components/locales/LanguageContext";
import MyContext from "../../components/context/Context";

const Labels = ({
	tasks,
	allLabels,
	updateStateApp,
	onActionWithTask,
	editTaskFunc,
	onSaveTask,
	search,
	theme,
	completedTasks,
}) => {
	const { getTranslation } = useContext(LanguageContext);
	const { menuOpen, tasksCount } = useContext(MyContext);
	const [openLabel, setOpenLabel] = useState(null);

	// Вызов updateStateApp при монтировании компонента
	useEffect(() => {
		updateStateApp("term", "");
	}, [updateStateApp]);

	const toggleLabel = (label) => {
		setOpenLabel((prevLabel) => (prevLabel === label ? null : label));
	};

	const onOpenFilterLabel = (label, clazz) => {
		const isSameLabel = openLabel === label;
		const allTasks = document.querySelectorAll(`.${clazz}`);
		allTasks.forEach((task) => {
			task.style.maxHeight = "0px";
		});

		const content = document.querySelector(`.${clazz}-${label}`);
		if (content && !isSameLabel) {
			content.style.maxHeight = `${content.scrollHeight}px`;
		}

		setOpenLabel(isSameLabel ? null : label);
	};

	const sortedLabels = search(allLabels, "label");

	return (
		<div className='labels'>
			<div className={`container${menuOpen ? " menu-active" : ""}`}>
				<h1 className='title'>{getTranslation("labels")}</h1>
				<p className='count-tasks'>
					<img
						src={countTask}
						alt=''
					/>
					{tasksCount} {getTranslation("countTasks")}
				</p>

				<CurrentDate />
				<hr className='divider' />

				<Search
					placeholder={getTranslation("searchLabel")}
					updateStateApp={updateStateApp}
				/>

				<div className='labels__wrapper'>
					{sortedLabels.length ? (
						sortedLabels.map((label, index) => {
							const filteredTasks = tasks.filter((task) =>
								task.labels.includes(label)
							);
							const taskCount = filteredTasks.length;

							return (
								<div
									key={index}
									className='labels__element'>
									<div
										className='label__name'
										onClick={() => {
											toggleLabel(label);
											onOpenFilterLabel(label, "tasks-label");
										}}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											width='20'
											height='20'>
											<path d='M21.68,9.108L13.204,.723C12.655,.173,11.869-.089,11.098,.013L4.209,.955c-.274,.038-.466,.29-.428,.563,.037,.273,.293,.461,.562,.428l6.889-.942c.46-.066,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.01,4.94l-.19,.199c-.209-.677-.58-1.314-1.114-1.848L11.204,4.723c-.549-.55-1.337-.812-2.106-.709l-6.889,.942c-.228,.031-.404,.213-.43,.44l-.765,6.916c-.083,.759,.179,1.503,.72,2.044l8.417,8.326c.85,.85,1.979,1.318,3.181,1.318h.014c1.208-.004,2.341-.479,3.189-1.339l3.167-3.208c.886-.898,1.317-2.081,1.292-3.257l.708-.743c1.732-1.754,1.724-4.6-.022-6.345Zm-2.688,9.643l-3.167,3.208c-.66,.669-1.542,1.039-2.481,1.042h-.011c-.935,0-1.812-.364-2.476-1.027L2.439,13.646c-.324-.324-.48-.77-.431-1.225l.722-6.528,6.502-.889c.462-.063,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.017,4.934ZM8,10c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z' />
										</svg>
										<span>{label}</span>
										<div className='toggle-icon'>
											<span className='task-count'>{taskCount}</span>
											{openLabel === label ? (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													width='25'
													height='25'>
													<path d='M18,15.5a1,1,0,0,1-.71-.29l-4.58-4.59a1,1,0,0,0-1.42,0L6.71,15.21a1,1,0,0,1-1.42-1.42L9.88,9.21a3.06,3.06,0,0,1,4.24,0l4.59,4.58a1,1,0,0,1,0,1.42A1,1,0,0,1,18,15.5Z' />
												</svg>
											) : (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													width='25'
													height='25'>
													<path d='M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z' />
												</svg>
											)}
										</div>
									</div>

									<div
										className={`tasks-label tasks-label-${label} ${
											label === openLabel ? "open" : ""
										}`}>
										{filteredTasks.length ? (
											<Task
												clazz={"tasks-list"}
												tasks={filteredTasks}
												allTasks={tasks}
												allLabels={allLabels}
												updateStateApp={updateStateApp}
												onActionWithTask={onActionWithTask}
												editTaskFunc={editTaskFunc}
												onSaveTask={onSaveTask}
												search={search}
												sortedBy={"label"}
												completedTasks={completedTasks}
											/>
										) : (
											<p className='no-task'>
												{getTranslation("noLabelTasksYet")}
											</p>
										)}
									</div>
								</div>
							);
						})
					) : (
						<p style={{ color: "grey" }}>{getTranslation("noLabelYet")}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Labels;
