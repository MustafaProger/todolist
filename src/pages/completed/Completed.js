import { Component } from "react";
import Menu from "../../components/menu/Menu";
import CurrentDate from "../../components/currentDate/CurrentDate";

import "./Completed.scss";
import check from '../../assets/icon/check-circle.svg'
import Task from "../../components/task/Task";

class Completed extends Component {
	render() {
		const {
			menuOpen,
			updateMenuState,
			completedTasksCount,
			completedTasks,
			onActionWithTask

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
						{completedTasksCount} completed
					</p>
					<CurrentDate />
					<hr className='divider' />
					<Task
						clazz={'completed-tasks-list'}
						tasks={completedTasks}
						onActionWithTask={onActionWithTask}
					/>
				</div>
			</div>
		);
	}
}

export default Completed;
