import { Component } from "react";
import Menu from "../../components/menu/Menu";
import Task from "../../components/task/Task";
import CurrentDate from "../../components/currentDate/CurrentDate";

import check from "../../assets/icon/check-circle.svg";

import { LanguageContext } from "../../components/locales/LanguageContext";

class Completed extends Component {
	static contextType = LanguageContext;

	render() {
		const {
			menuOpen,
			completedTasks,
			completedTasksCount,
			updateStateBool,
			onActionWithTask,
			theme,
		} = this.props;

		const { getTranslation } = this.context;

		return (
			<div className='done-tasks'>
				<Menu
					updateStateBool={updateStateBool}
					menuOpen={menuOpen}
					theme={theme}
				/>
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
						onActionWithTask={onActionWithTask}
					/>
				</div>
			</div>
		);
	}
}

export default Completed;
