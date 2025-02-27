import React, { useContext } from "react";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import check from "../../assets/icon/check-circle.svg";
import Search from "../../components/search/Search";

import { LanguageContext } from "../../components/locales/LanguageContext";
import MyContext from "../../components/context/Context";

const Tasks = ({
	onTask,
	search,
}) => {
	
	const { getTranslation } = useContext(LanguageContext);
	const { menuOpen, tasksCount, tasks, completedTasks } = useContext(MyContext);

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
				/>
				<Task
					clazz={"tasks-list"}
					tasks={tasks}
					search={search}
					sortedBy={"task"}
					completedTasks={completedTasks}
				/>
				<AddTask
					onTask={onTask}
					completedTasks={completedTasks}
				/>
			</div>
		</div>
	);
};

export default Tasks;
