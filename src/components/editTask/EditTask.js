import { Component } from "react";
import "./EditTask.scss";
import Flag from "../../assets/icon/flag";

class EditTask extends Component {
	state = {
		task: this.props.task,
		description: this.props.description,
		importance: this.props.importance,
		isOpen: false,
	};

	handleChange = (prop, value) => {
		this.setState({ [prop]: value });
	};

	handleSave = () => {
		if (!this.state.task.trim()) {
			alert("Task name cannot be empty.");
			return;
		}

		const updatedTask = {
			task: this.state.task,
			description: this.state.description,
			importance: this.state.importance,
		};

		this.props.saveTask(updatedTask);
	};

	toggleDropdown = () => {
		this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
	};

	handleImportanceChange = (value) => {
		this.setState({ importance: value, isOpen: false });
	};

	render() {
		const { task, description, importance, isOpen } = this.state;
		const options = [
			{ value: "Priority", label: "Priority", icon: <Flag theme='#CDCDCD' /> },
			{ value: "Low", label: "Low", icon: <Flag theme='#5390F5' /> },
			{ value: "Medium", label: "Medium", icon: <Flag theme='orange' /> },
			{ value: "High", label: "High", icon: <Flag theme='#FF6247' /> },
		];

		return (
			<div className='edit-task__form'>
				<input
					type='text'
					className='edit-task__form__input'
					value={task}
					onChange={(e) => this.handleChange("task", e.target.value)}
					placeholder='Task name'
				/>
				<textarea
					className='edit-task__form__textarea'
					value={description}
					onChange={(e) => this.handleChange("description", e.target.value)}
					placeholder='Description'
				/>
				<div className='edit-task__form__importance'>
					<div
						className='custom-select'
						onClick={this.toggleDropdown}>
						<div className='selected-option'>
							{options.find((option) => option.value === importance)?.icon}
							<span>{importance}</span>
						</div>
						{isOpen && (
							<ul className='dropdown-list'>
								{options.map((option) => (
									<li
										key={option.value}
										onClick={() => this.handleImportanceChange(option.value)}
										className='dropdown-item'>
										{option.icon}
										<span>{option.label}</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className='edit-task__form__buttons'>
					<button
						className='edit-task__form__buttons__cancel'
						onClick={this.props.cancelEdit}>
						Cancel
					</button>
					<button
						className='edit-task__form__buttons__add'
						onClick={this.handleSave}>
						Save
					</button>
				</div>
			</div>
		);
	}
}

export default EditTask;
