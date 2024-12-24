import { Component } from "react";
import "./Task.scss";
import Check from "../../assets/icon/check";

import pencil from '../../assets/icon/pencil.svg';
import trash from '../../assets/icon/trash.svg';


class Task extends Component {
	render() {
		const { tasks } = this.props;

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
						className='task-item'>
						<div className='task-header'>
							<div
								className='importance-circle'
								style={{
									border: `2px solid ${importanceColors[importance]}`,
								}}>
									<Check color={importanceColors[importance]}/>
								</div>
							<h3 className='task-name'>
								{task.length > 80 ? task.slice(0, 80) + "..." : task}
							</h3>
							<div className='menu-trigger'>
								<img src={pencil} alt="pencil"/>
								<img src={trash} alt="trash"/>
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
		);
	}
}

export default Task;
