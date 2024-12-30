import { Component } from "react";
import Menu from "../../components/menu/Menu";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import "./Tasks.scss";
import check from '../../assets/icon/check-circle.svg'

class Tasks extends Component {
	render() {
		const {
			tasks,
			countTasks,
			addTask,
			updateStateEvent,
			updateStatePriority,
			onTask,
			onActionWithTask,
			menuOpen,
			updateStateBool,
			editTaskFunc,
			onSaveTask,
			editingTask,
			addLabel,
			allLabels,
			currentLabel
		} = this.props;

		return (
			<div className="tasks">
				<Menu updateStateBool={updateStateBool} menuOpen={menuOpen} />
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className="title">Tasks</h1>
					<p className="count-tasks">
						<img src={check} alt="" />
						{countTasks} tasks
					</p>
					<CurrentDate />
					<hr className="divider" />
					<Task
						clazz={"tasks-list"}
						tasks={tasks}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						editingTask={editingTask}
					/>
					<AddTask
						addTaskState={addTask}
						updateStateBool={updateStateBool}
						updateStateEvent={updateStateEvent}
						updateStatePriority={updateStatePriority}
						onTask={onTask}
						addLabel={addLabel}
						allLabels={allLabels}
						currentLabel={currentLabel}
					/>
				</div>
			</div>
		);
	}
}

export default Tasks;