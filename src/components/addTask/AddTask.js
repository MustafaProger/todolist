import { Component, createRef } from "react";
import "./AddTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";

import { LanguageContext } from "../locales/LanguageContext";

class AddTask extends Component {
	static contextType = LanguageContext;

	state = {
		addTask: false,
		task: "",
		description: "",
		importance: "Priority",
		isOpen: false,
		chosenLabels: [],
		currentLabel: "",
		time: "",
		resetSignal: 0,
		updateImportance: 0,
	};

	ref = {
		inputTaskName: createRef(),
		textarea: createRef(),
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.allLabels !== this.props.allLabels) {
			this.props.updateStateBool(
				"tasks",
				this.props.tasks.map((task) => task)
			);
		}

		if (
			prevState.addTask !== this.state.addTask &&
			this.state.addTask === true
		) {
			this.ref.inputTaskName.current.focus();
		}
	}

	updateState = (prop, value) => {
		this.setState({ [prop]: value });
		if (prop === "importance") {
			this.setState({ [prop]: value, isOpen: false });
		}
	};

	handleKeyDown = (e) => {
		// Проверяем, если нажата клавиша Enter и inputTaskName находится в фокусе
		if (
			e.key === "Enter" &&
			document.activeElement === this.ref.inputTaskName.current
		) {
			// Останавливаем стандартное поведение, чтобы избежать ненужного ввода
			e.preventDefault();

			setTimeout(() => {
				window.scrollBy({ top: 100, left: 0, behavior: "smooth" });
			}, 200);

			// Если фокус на inputTaskName, перемещаем его на textarea
			this.ref.textarea.current.focus();
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

		this.ref.textarea.current.value = "";
		this.ref.inputTaskName.current.value = "";
	};

	autoResizeTextarea = () => {
		const textarea = this.ref.textarea.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	toggleDropdown = () => {
		this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
	};

	render() {
		const { addTask, importance, isOpen } = this.state;

		const { getTranslation } = this.context;

		const options = [
			{
				value: "Priority",
				label: getTranslation("priority"),
				icon: <Flag theme='#CDCDCD' />,
			},
			{
				value: "Low",
				label: getTranslation("low"),
				icon: <Flag theme='#5390F5' />,
			},
			{
				value: "Medium",
				label: getTranslation("medium"),
				icon: <Flag theme='orange' />,
			},
			{
				value: "High",
				label: getTranslation("high"),
				icon: <Flag theme='#FF6247' />,
			},
		];

		const {
			tasks,
			updateStateEvent,
			updateStateBool,
			allLabels,
			onTask,
			completedTasks,
		} = this.props;

		return (
			<div className='add-task'>
				{addTask ? (
					<div className='add-task__form'>
						<input
							type='text'
							className='add-task__form__input'
							placeholder={getTranslation("taskName")}
							onChange={(e) => this.updateState("task", e.target.value)}
							ref={this.ref.inputTaskName}
							onKeyDown={this.handleKeyDown}
						/>
						<textarea
							className='add-task__form__textarea'
							placeholder={getTranslation("description")}
							onInput={this.autoResizeTextarea}
							onChange={(e) => this.updateState("description", e.target.value)}
							ref={this.ref.textarea}
						/>
						<div className='add-task__form__importance'>
							<div
								className={`custom-select ${isOpen ? "active" : ""}`}
								onClick={this.toggleDropdown}>
								<div className='selected-option'>
									{options.find((option) => option.value === importance)?.icon}
									<span>
										{getTranslation(`${importance.toLocaleLowerCase()}`)}
									</span>
								</div>

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
							</div>
						</div>

						<Time
							updateState={this.updateState}
							resetSignal={this.state.resetSignal}
						/>

						<Label
							tasks={tasks}
							allLabels={allLabels}
							currentLabel={this.state.currentLabel}
							updateStateEvent={updateStateEvent}
							updateStateBool={updateStateBool}
							handleChange={this.updateState}
							chosenLabels={this.state.chosenLabels}
							updateState={this.updateState}
							completedTasks={completedTasks}
						/>

						<div className='add-task__form__buttons'>
							<button
								className='add-task__form__buttons__cancel'
								onClick={() => this.updateState("addTask", false)}>
								{getTranslation("cancel")}
							</button>
							<button
								className='add-task__form__buttons__add'
								onClick={() => [onTask(this.state), this.defaultState()]}>
								{getTranslation("addTask")}
							</button>
						</div>
					</div>
				) : (
					<div
						className='add-task__button'
						onClick={() => this.updateState("addTask", true)}>
						<span></span>
						<p>{getTranslation("addTask")}</p>
					</div>
				)}
			</div>
		);
	}
}

export default AddTask;
