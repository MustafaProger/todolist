import { Component, createRef } from "react";

import "./AddTask.scss";

class AddTask extends Component {
	state = {
		importance: "None",
	};

	textareaRef = createRef();

	autoResizeTextarea = () => {
		const textarea = this.textareaRef.current;
        textarea.style.height = "auto"; // Сброс высоты
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	handleImportanceChange = (event) => {
		this.setState({ importance: event.target.value });
	};

	render() {
		return (
			<div className='add-task'>
				{this.props.addTaskState ? (
					<div className='add-task__form'>
						<input
							type='text'
							className='add-task__form__input'
							placeholder='Task Name'
						/>
						<textarea
							className='add-task__form__textarea'
							placeholder='Description'
							ref={this.textareaRef}
							onInput={this.autoResizeTextarea}
						/>
						<div className='add-task__form__importance'>
							<select
								className='add-task__form__importance__select'
								value={this.state.importance}
								onChange={this.handleImportanceChange}>
								<option value='None'>None</option>
								<option value='Low'>Low</option>
								<option value='Medium'>Medium</option>
								<option value='High'>High</option>
							</select>
						</div>
						<div className='add-task__form__buttons'>
							<button
								className='add-task__form__buttons__cancel'
								onClick={this.props.addTaskFunc}>
								Cancel
							</button>
							<button className='add-task__form__buttons__add'>Add Task</button>
						</div>
					</div>
				) : (
					<div
						className='add-task__button'
						onClick={this.props.addTaskFunc}>
						<span></span>
						<p>Add Task</p>
					</div>
				)}
			</div>
		);
	}
}

export default AddTask;
