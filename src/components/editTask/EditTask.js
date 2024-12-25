import { Component } from "react";
import "./EditTask.scss";

class EditTask extends Component {
	state = {
		task: this.props.task, // Название задачи
		description: this.props.description, // Описание задачи
		importance: this.props.importance, // Приоритет задачи
	};

	handleChange = (prop, value) => {
		this.setState({ [prop]: value });
	};

	handleSave = () => {
		const updatedTask = {
			task: this.state.task,
			description: this.state.description,
			importance: this.state.importance,
		};
		this.props.saveTask(updatedTask); // Сохраняем изменения
	};

	render() {
		const { task, description, importance } = this.state;

		return (
			<div className='edit-task__form'>
				<input
					type='text'
					className='edit-task__form__input'
					value={task}
					onChange={(e) => this.handleChange("task", e.target.value)} // Используем onChange
					placeholder='Task name'
				/>
				<textarea
					className='edit-task__form__textarea'
					value={description}
					onChange={(e) => this.handleChange("description", e.target.value)} // Используем onChange
					placeholder='Task description'
				/>
				<div className='edit-task__form__importance'>
					<select
						className='edit-task__form__importance__select'
						value={importance}
						onChange={(e) => this.handleChange("importance", e.target.value)} // Используем onChange
					>
						<option value='Low'>Low</option>
						<option value='Medium'>Medium</option>
						<option value='High'>High</option>
					</select>
				</div>
				<div className='edit-task__form__buttons'>
					<button
						className='edit-task__form__buttons__add'
						onClick={this.handleSave}
					>
						Save
					</button>
					<button
						className='edit-task__form__buttons__cancel'
						onClick={this.props.cancelEdit}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default EditTask;