import React, { useContext } from "react";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import check from "../../assets/icon/check-circle.svg";
import Search from "../../components/search/Search";

import { LanguageContext } from "../../components/locales/LanguageContext";
import MyContext from "../../components/context/Context";

const Tasks = ({
	updateStateApp,
	onTask,
	onActionWithTask,
	editTaskFunc,
	onSaveTask,
	allLabels,
	search,
	completedTasks,
}) => {
	// Получаем значения из контекста
	const { getTranslation } = useContext(LanguageContext);
	const { menuOpen, tasksCount, tasks } = useContext(MyContext);

	return (
		<div className='tasks'>
			<div className={`container${menuOpen ? " menu-active" : ""}`}>
				<h1 className='title'>{getTranslation("tasks")}</h1>
				<p className='count-tasks'>
					<img
						src={check}
						alt=''
					/>
					{tasksCount} {getTranslation("countTasks")}
				</p>
				<CurrentDate />
				<hr className='divider' />
				<Search
					placeholder={getTranslation("searchTask")}
					updateStateApp={updateStateApp}
				/>
				<Task
					clazz={"tasks-list"}
					tasks={tasks}
					onActionWithTask={onActionWithTask}
					editTaskFunc={editTaskFunc}
					onSaveTask={onSaveTask}
					updateStateApp={updateStateApp}
					allLabels={allLabels}
					search={search}
					sortedBy={"task"}
					completedTasks={completedTasks}
				/>
				<AddTask
					tasks={tasks}
					updateStateApp={updateStateApp}
					onTask={onTask}
					allLabels={allLabels}
					completedTasks={completedTasks}
				/>
			</div>
		</div>
	);
};

export default Tasks;
