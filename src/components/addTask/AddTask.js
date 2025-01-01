import { Component, createRef } from "react";
import "./AddTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";

class AddTask extends Component {
	state = {
		importance: "Priority", // Установите значение по умолчанию
		isOpen: false, // Для управления открытием/закрытием селекта
	};

	textareaRef = createRef();

	autoResizeTextarea = () => {
		const textarea = this.textareaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	handleImportanceChange = (value) => {
		this.setState({ importance: value, isOpen: false });
		this.props.updateStatePriority(value);
	};

	toggleDropdown = () => {
		this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
	};

	render() {
		const { importance, isOpen } = this.state;

		const {
			tasks,
			addTaskState,
			updateStateEvent,
			updateStateBool,
			addLabel,
			currentLabel,
			allLabels,
			chosenLabels,
			onTask,
		} = this.props;

		const options = [
			{ value: "Priority", label: "Priority", icon: <Flag theme='#CDCDCD' /> },
			{ value: "Low", label: "Low", icon: <Flag theme='#5390F5' /> },
			{ value: "Medium", label: "Medium", icon: <Flag theme='orange' /> },
			{ value: "High", label: "High", icon: <Flag theme='#FF6247' /> },
		];

		return (
			<div className='add-task'>
				{addTaskState ? (
					<div className='add-task__form'>
						<input
							type='text'
							className='add-task__form__input'
							placeholder='Task Name'
							onChange={(e) => updateStateEvent("task", e)}
						/>
						<textarea
							className='add-task__form__textarea'
							placeholder='Description'
							ref={this.textareaRef}
							onInput={this.autoResizeTextarea}
							onChange={(e) => updateStateEvent("description", e)}
						/>
						<div className='add-task__form__importance'>
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
												onClick={(e) => [
													this.handleImportanceChange(option.value),
												]}
												className='dropdown-item'>
												{option.icon}
												<span>{option.label}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>

						<Time updateStateBool={updateStateBool} />

						<Label
							addLabel={addLabel}
							currentLabel={currentLabel}
							allLabels={allLabels}
							updateStateEvent={updateStateEvent}
							updateStateBool={updateStateBool}
							tasks={tasks}
							chosenLabels={chosenLabels}
						/>

						<div className='add-task__form__buttons'>
							<button
								className='add-task__form__buttons__cancel'
								onClick={() => updateStateBool("addTask", false)}>
								Cancel
							</button>
							<button
								className='add-task__form__buttons__add'
								onClick={onTask}>
								Add Task
							</button>
						</div>
					</div>
				) : (
					<div
						className='add-task__button'
						onClick={() => updateStateBool("addTask", true)}>
						<span></span>
						<p>Add Task</p>
					</div>
				)}
			</div>
		);
	}
}

export default AddTask;
