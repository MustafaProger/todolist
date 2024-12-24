import { Component } from "react";
import "./Task.scss";

class Task extends Component {
	// state = {
	// 	activeTaskId: null, // ID задачи, у которой открыто меню
	// };

	// // Открытие/закрытие меню для задачи
	// toggleMenu = (id) => {
	// 	this.setState((prevState) => ({
	// 		activeTaskId: prevState.activeTaskId === id ? null : id,
	// 	}));
	// };

	// // Метод для изменения важности задачи
	// changeImportance = (id, newImportance) => {
	// 	this.props.updateTask(id, { importance: newImportance });
	// 	this.setState({ activeTaskId: null }); // Закрыть меню после выбора
	// };

	render() {
		const { tasks } = this.props;
		// const { activeTaskId } = this.state;

		const importanceColors = {
			Priority: "#CDCDCD",
			Low: "#5390F5",
			Medium: "orange",
			High: "#FF6247",
		};

		return (
			<div className='tasks-list'>
				{tasks.map(({ id, task, description, importance }) => (
					<div
						key={id}
						className='task-item'
						// onMouseLeave={() => this.setState({ activeTaskId: null })} // Закрыть меню при уходе курсора
					>
						<div className='task-header'>
							<div
								className='importance-circle'
								style={{
									border: `2px solid ${importanceColors[importance]}`,
								}}></div>
							<h3 className='task-name'>
								{task.length > 80 ? task.slice(0, 80) + "..." : task}
							</h3>
							<div
								className='menu-trigger'
								// onClick={() => this.toggleMenu(id)}
							>
								⋮
							</div>
							{/* {activeTaskId === id && (
								<div className='task-menu'>
									<button onClick={() => this.props.editTask(id)}>
										Edit Task
									</button>
									<button onClick={() => this.props.editTask(id)}>
										Delete Task
									</button>
									<div className='importance-options'>
										{Object.keys(importanceColors).map((level) => (
											<button
												key={level}
												onClick={() => this.changeImportance(id, level)}>
												<span
													className='importance-circle'
													style={{
														backgroundColor: importanceColors[level],
													}}></span>
												{level}
											</button>
										))} 
									</div>
								</div>
							)}*/}
						</div>
						<p className='task-description'>
							{description.length > 80
								? description.slice(0, 80) + "..."
								: description}
						</p>
					</div>
				))}
			</div>
		);
	}
}

export default Task;
