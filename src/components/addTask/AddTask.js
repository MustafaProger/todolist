import { Component, createRef } from "react";
import "./AddTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";

class AddTask extends Component {
	state = {
		addTask: true,
		task: "",
		description: "",
		importance: "Priority",
		isOpen: false,
		chosenLabels: [],
		currentLabel: '',
		time: "",
		resetSignal: 0,
	};

	textareaRef = createRef();

	ref = {
		inputTaskName: createRef(),
		textarea: createRef(),
	};

	updateState = (prop, value) => {
		this.setState({ [prop]: value });
		if (prop === "importance") {
			this.setState({ [prop]: value, isOpen: false });
		}
	};

	defaultState = () => {
		this.setState((prevState) => ({
			addTask: true,
			task: "",
			description: "",
			importance: "Priority",
			isOpen: prevState.isOpen,
			chosenLabels: [],
			time: "",
			resetSignal: this.state.resetSignal + 1,
		}));

		this.textareaRef.current.value = "";
		this.ref.inputTaskName.current.value = "";
	};

	autoResizeTextarea = () => {
		const textarea = this.textareaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	toggleDropdown = () => {
		this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
	};

	render() {
		const { addTask, importance, isOpen } = this.state;

		const {
			tasks,
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
				{addTask ? (
					<div className='add-task__form'>
						<input
							type='text'
							className='add-task__form__input'
							placeholder='Task Name'
							onChange={(e) => this.updateState("task", e.target.value)}
							ref={this.ref.inputTaskName}
						/>
						<textarea
							className='add-task__form__textarea'
							placeholder='Description'
							ref={this.textareaRef}
							onInput={this.autoResizeTextarea}
							onChange={(e) => this.updateState("description", e.target.value)}
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
													this.updateState("importance", option.value),
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

						<Time
							updateState={this.updateState}
							resetSignal={this.state.resetSignal}
						/>

						<Label
							addLabel={addLabel}
							currentLabel={this.state.currentLabel}
							allLabels={allLabels}
							updateStateEvent={updateStateEvent}
							updateStateBool={updateStateBool}
							handleChange={this.updateState}
							tasks={tasks}
							chosenLabels={chosenLabels}
							updateState={this.updateState}
						/>

						<div className='add-task__form__buttons'>
							<button
								className='add-task__form__buttons__cancel'
								onClick={() => this.updateState("addTask", false)}>
								Cancel
							</button>
							<button
								className='add-task__form__buttons__add'
								onClick={() => [onTask(this.state), this.defaultState()]}>
								Add Task
							</button>
						</div>
					</div>
				) : (
					<div
						className='add-task__button'
						onClick={() => this.updateState("addTask", true)}>
						<span></span>
						<p>Add Task</p>
					</div>
				)}
			</div>
		);
	}
}

export default AddTask;
