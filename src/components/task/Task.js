import { Component } from "react";
import "./Task.scss";
import Check from "../../assets/icon/check";

import pencil from "../../assets/icon/pencil.svg";
import trash from "../../assets/icon/trash.svg";
import refresh from '../../assets/icon/refresh.svg'

class Task extends Component {
	renderItem = () => {
		const { tasks, clazz } = this.props;

		const importanceColors = {
			Priority: "#CDCDCD",
			Low: "#5390F5",
			Medium: "orange",
			High: "#FF6247",
		};

		if (clazz === "tasks-list") {
			return tasks.length > 0 ? (
				<div className='tasks-list'>
					{tasks.map(({ id, task, description, importance }) => (
						<div
							key={id}
							className='task-item'>
							<div className='task-header'>
								<div
									className='importance-circle'
									onClick={() =>
										this.props.onActionWithTask(id, "completed")
									}
									style={{
										border: `2px solid ${importanceColors[importance]}`,
									}}>
									<Check color={importanceColors[importance]} />
								</div>
								<h3 className='task-name'>
									{task.length > 80 ? task.slice(0, 80) + "..." : task}
								</h3>
								<div className='menu-trigger'>
									<img
										src={pencil}
										alt='pencil'
									/>
									<img
										src={trash}
										alt='trash'
										onClick={() =>
											this.props.onActionWithTask(id, "remove")
										}
									/>
								</div>
							</div>
							<p className='task-description'>
								{description.length > 80
									? description.slice(0, 80) + "..."
									: description}
							</p>
						</div>
					))}
				</div>
			) : null;
		} else if (clazz === "completed-tasks-list") {
			return tasks.length > 0 ? (
				<div className='completed-tasks-list'>
					{tasks.map(({ id, task, description, importance }) => (
						<div
							key={id}
							className='task-item completed'
							style={{
								borderLeft: `5px solid ${importanceColors[importance]}`,
							}}>
							{" "}
							{/* добавлен класс "completed" */}
							<div className='task-header'>
								<div
									className='importance-circle'
									style={{
										border: `2px solid ${importanceColors[importance]}`,
									}}>
									<Check color={importanceColors[importance]} />
								</div>
								<h3 className='task-name'>
									{task.length > 80 ? task.slice(0, 80) + "..." : task}
								</h3>
								<div className='menu-trigger'>
									<img
										src={trash}
										alt='trash'
										onClick={() =>
											this.props.onActionWithTask(id, "remove-completed")
										}
									/>
									<img
										src={refresh}
										alt='refresh'
										onClick={() =>
											this.props.onActionWithTask(id, "refresh")
										}
									/>
								</div>
							</div>
							<p className='task-description'>
								{description.length > 80
									? description.slice(0, 80) + "..."
									: description}
							</p>
						</div>
					))}
				</div>
			) : (
				<p>No completed tasks yet</p>
			);
		}
	};

	render() {
		return <>{this.renderItem()}</>;
	}
}

export default Task;
