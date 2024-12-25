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
			onClickAddСancel,
			updateState,
			updateStatePriority,
			onTask,
			onActionWithTask,
			menuOpen,
			updateMenuState,
			editTaskFunc,
			onSaveTask,
			editingTask  // Достаем из props
		} = this.props;

		return (
			<div className="tasks">
				<Menu updateMenuState={updateMenuState} menuOpen={menuOpen} />
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
						addTaskFunc={onClickAddСancel}
						updateState={updateState}
						updateStatePriority={updateStatePriority}
						onTask={onTask}
					/>
				</div>
			</div>
		);
	}
}

export default Tasks;