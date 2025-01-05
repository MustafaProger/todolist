import { Component } from "react";
import Menu from "../../components/menu/Menu";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import check from "../../assets/icon/check-circle.svg";
import Search from "../../components/search/Search";

class Tasks extends Component {
	render() {
		const {
			menuOpen,
			tasks,
			tasksCount,
			updateStateBool,
			updateStateEvent,
			updateStatePriority,
			onTask,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
			allLabels,
			chosenLabels,
			search,
			theme
		} = this.props;

		return (
			<div className='tasks'>
				<Menu
					updateStateBool={updateStateBool}
					menuOpen={menuOpen}
					theme={theme}

				/>
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className='title'>Tasks</h1>
					<p className='count-tasks'>
						<img
							src={check}
							alt=''
						/>
						{tasksCount} tasks
					</p>
					<CurrentDate />
					<hr className='divider' />
					<Search
						placeholder={"Type a taskname"}
						updateStateEvent={updateStateEvent}
					/>
					<Task
						clazz={"tasks-list"}
						tasks={tasks}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						updateStateBool={updateStateBool}
						updateStateEvent={updateStateEvent}
						allLabels={allLabels}
						search={search}
						sortedBy={"task"}
					/>
					<AddTask
						tasks={tasks}
						updateStateBool={updateStateBool}
						updateStateEvent={updateStateEvent}
						updateStatePriority={updateStatePriority}
						onTask={onTask}
						allLabels={allLabels}
					/>
				</div>
			</div>
		);
	}
}

export default Tasks;
