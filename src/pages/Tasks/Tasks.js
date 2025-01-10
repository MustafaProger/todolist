import { Component } from "react";
import Menu from "../../components/menu/Menu";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import check from "../../assets/icon/check-circle.svg";
import Search from "../../components/search/Search";

import { LanguageContext } from "../../components/locales/LanguageContext";

class Tasks extends Component {
	static contextType = LanguageContext;
	render() {
		const {
			menuOpen,
			tasks,
			tasksCount,
			updateStateApp,
			updateStateEvent,
			updateStatePriority,
			onTask,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
			allLabels,
			search,
			theme,
			completedTasks,
		} = this.props;

		const { getTranslation } = this.context;

		return (
			<div className='tasks'>
				<Menu
					updateStateApp={updateStateApp}
					menuOpen={menuOpen}
					theme={theme}
				/>
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className='title'>{getTranslation('tasks')}</h1>
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
						updateStateEvent={updateStateEvent}
						allLabels={allLabels}
						search={search}
						sortedBy={"task"}
						completedTasks={completedTasks}
					/>
					<AddTask
						tasks={tasks}
						updateStateApp={updateStateApp}
						updateStateEvent={updateStateEvent}
						updateStatePriority={updateStatePriority}
						onTask={onTask}
						allLabels={allLabels}
						completedTasks={completedTasks}
					/>
				</div>
			</div>
		);
	}
}

export default Tasks;
