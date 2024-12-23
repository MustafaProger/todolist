import { Component } from "react";

import "./Task.scss";

class Task extends Component {
	render() {
		console.log(2);
		return (
			<div className='tasks-list'>
				{this.state.tasks.map(({ id, task, description }) => (
					<div
						key={id}
						className='task-item'>
						<h3>{task}</h3>
						<p>{description}</p>
					</div>
				))}
			</div>
		);
	}
}

export default Task;
