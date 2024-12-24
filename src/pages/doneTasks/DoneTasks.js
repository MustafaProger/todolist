import { Component } from "react";
import Menu from "../../components/menu/Menu";

import "./DoneTasks.scss";
import check from '../../assets/icon/check-circle.svg'
import CurrentDate from "../../components/currentDate/CurrentDate";
import Task from "../../components/task/Task";


class DoneTasks extends Component {
	render() {
		const {
			tasks,
			countTasks,
			addTask,
			onClickAddСancel,
			updateState,
			updateStatePriority,
			onTask,
			removeOrCompletedTask,
			menuOpen,
			updateMenuState,
			completedTasksCount
		} = this.props;
		return (
			<div className='done-tasks'>
				<Menu
					updateMenuState={updateMenuState}
					menuOpen={menuOpen}
				/>
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className='title'>Completed</h1>
					<p className='count-tasks'>
						<img
							src={check}
							alt=''
						/>
						{completedTasksCount} tasks completed
					</p>
					<CurrentDate />
					<hr className='divider' />
					{/* <Task
						tasks={tasks}
						removeOrCompletedTask={removeOrCompletedTask}
					/> */}
				</div>
			</div>
		);
	}
}

export default DoneTasks;
