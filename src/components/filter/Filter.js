import { Component } from "react";

import "./Filter.scss";
import Flag from "../../assets/icon/flag";
import Task from "../task/Task";

class Filter extends Component {
	render() {
		const options = [
			{ value: "High", icon: <Flag theme='#FF6247' /> },
			{ value: "Medium", icon: <Flag theme='orange' /> },
			{ value: "Low", icon: <Flag theme='#5390F5' /> },
			{ value: "Priority", icon: <Flag theme='#CDCDCD' /> },
		];
		const { tasks, onActionWithTask, editTaskFunc, onSaveTask, editingTask } =
			this.props;
		return (
			<div className='filtered'>
				{options.map(({ value, icon }, id) => {
					return (
						<div
							key={id}
							className='filtered-item'>
							<div className='importance'>
								{icon} <span>{value}</span>
								{/* {value === tasks[id]["importance"] ? 1 : null} */}
								<Task
									clazz={"tasks-list"}
									tasks={tasks}
									onActionWithTask={onActionWithTask}
									editTaskFunc={editTaskFunc}
									onSaveTask={onSaveTask}
									editingTask={editingTask}
								/>
							</div>
							<hr className='divider' />
						</div>
					);
				})}
			</div>
		);
	}
}

export default Filter;
