import { Component } from "react";
import "./EditTask.scss";
import Flag from "../../assets/icon/flag";
import Label from "../label/Label";
import Time from "../time/Time";

import { LanguageContext } from "../locales/LanguageContext";

class EditTask extends Component {
	static contextType = LanguageContext;

	state = {
		id: this.props.id,
		task: this.props.task,
		description: this.props.description,
		importance: this.props.importance,
		chosenLabels: [...this.props.labels],
		time: this.props.time,

		isOpenImportance: false,
		isOpenLabels: false,
		currentLabel: "",
	};

	updateState = (prop, value) => {
		this.setState({ [prop]: value });
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.allLabels.length !== this.props.allLabels.length ||
			prevState.task !== this.state.task ||
			prevState.description !== this.state.description ||
			prevState.importance !== this.state.importance ||
			prevState.chosenLabels.length !== this.state.chosenLabels.length ||
			prevState.time !== this.state.time
		) {
			this.handleSave();
		}
	}

	handleSave = () => {
		if (!this.state.task.trim()) {
			alert("Task name cannot be empty.");
			return;
		}

		const updatedTask = {
			id: this.props.id,
			task: this.state.task,
			description: this.state.description,
			importance: this.state.importance,
			labels: this.state.chosenLabels,
			time: this.state.time,
		};

		// if (this.state.time === "Invalid Date") {
		// 	alert("Enter the time correctly");
		// 	return;
		// }

		this.props.onSaveTask(updatedTask);
	};

	toggleDropdown = (prop) => {
		this.setState((prevState) => ({ [prop]: !prevState[prop] }));
	};

	handleImportanceChange = (value) => {
		this.setState({ importance: value, isOpenImportance: false });
	};

	render() {
		const { task, description, importance, isOpenImportance, isOpenLabels } =
			this.state;

		const { tasks, addLabel, allLabels, updateStateApp, completedTasks } =
			this.props;

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

		return (
			<>
				<div className='edit-task__overlay'></div>
				<div className='edit-task__form'>
					<input
						type='text'
						className='edit-task__form__input'
						value={task}
						onChange={(e) => this.updateState("task", e.target.value)}
						placeholder={getTranslation("taskName")}
					/>
					<textarea
						className='edit-task__form__textarea'
						value={description}
						onChange={(e) => this.updateState("description", e.target.value)}
						placeholder={getTranslation("description")}
					/>
					<div className='edit-task__form__importance'>
						<div
							className={`custom-select ${isOpenImportance ? "active" : ""}`}
							onClick={() => this.toggleDropdown("isOpenImportance")}>
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
										onClick={() => this.handleImportanceChange(option.value)}
										className='dropdown-item'>
										{option.icon}
										<span>{option.label}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					<Time
						updateStateApp={updateStateApp}
						updateState={this.updateState}
					/>
					<Label
						tasks={tasks}
						labels={this.props.labels}
						updateStateApp={updateStateApp}
						addLabel={addLabel}
						currentLabel={this.state.currentLabel}
						allLabels={allLabels}
						chosenLabels={this.state.chosenLabels}
						updateState={this.updateState}
						isOpenLabels={isOpenLabels}
						completedTasks={completedTasks}
					/>
					<div className='edit-task__form__buttons'>
						<button
							className='edit-task__form__buttons__add'
							onClick={() => this.props.cancelEdit()}
							style={{ padding: "10px 30px" }}>
							Exit
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default EditTask;
