import React, { useContext } from "react";
import Task from "../../components/task/Task";
import CurrentDate from "../../components/currentDate/CurrentDate";

import check from "../../assets/icon/check-circle.svg";

import { LanguageContext } from "../../components/locales/LanguageContext";
import MyContext from "../../components/context/Context";

const Completed = ({
	completedTasksCount,
}) => {
	const { getTranslation } = useContext(LanguageContext);
	const { menuOpen, completedTasks } = useContext(MyContext);

	return (
		<div className='done-tasks'>
			<div className={`container${menuOpen ? " menu-active" : ""}`}>
				<h1 className='title'>{getTranslation("completed")}</h1>
				<p className='count-tasks'>
					<img
						src={check}
						alt=''
					/>
					{completedTasksCount} {getTranslation("countTasksCompleted")}
				</p>
				<CurrentDate />
				<hr className='divider' />
				<Task
					clazz={"completed-tasks-list"}
					tasks={completedTasks}
				/>
			</div>
		</div>
	);
};

export default Completed;
