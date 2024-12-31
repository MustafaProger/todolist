import { Component } from "react";
import "./Task.scss";
import Check from "../../assets/icon/check";
import pencil from "../../assets/icon/pencil.svg";
import trash from "../../assets/icon/trash.svg";
import refresh from "../../assets/icon/refresh.svg";
import EditTask from "../editTask/EditTask";

class Task extends Component {
	state = {
		editingTaskId: null, // ID редактируемой задачи
		editedTask: {}, // Данные редактируемой задачи
	};

	// Включить режим редактирования
	startEditing = (id, taskData) => {
		this.setState({
			editingTaskId: id,
			editedTask: { ...taskData },
		});
	};

	// Обновление данных редактируемой задачи
	handleEditChange = (field, value) => {
		this.setState((prevState) => ({
			editedTask: {
				...prevState.editedTask,
				[field]: value,
			},
		}));
	};

	// Сохранить изменения
	saveTask = (updatedTask) => {
		const { editedTask } = this.state;
		this.props.editTaskFunc(editedTask.id, updatedTask); // Передаем обновленную задачу через пропс
		this.setState({ editingTaskId: null, editedTask: {} }); // Сбрасываем состояние
		this.props.updateStateEvent("chosenLabels", []);
		this.props.updateStateBool("addLabel", false);
	};

	// Отмена редактирования
	cancelEdit = () => {
		this.setState({ editingTaskId: null, editedTask: {} });
		this.props.updateStateEvent("chosenLabels", []);
		this.props.updateStateBool("addLabel", false);
	};

	renderItem = () => {
		const {
			tasks,
			clazz,
			addLabel,
			allLabels,
			currentLabel,
			chosenLabels,
			updateStateEvent,
			updateStateBool,
			onOpenFilterLabel
		} = this.props;
		const { editingTaskId } = this.state;
	
		const importanceColors = {
			Priority: "#CDCDCD",
			Low: "#5390F5",
			Medium: "orange",
			High: "#FF6247",
		};
	
		// Задаём порядок важности
		const importanceOrder = {
			High: 1,
			Medium: 2,
			Low: 3,
			Priority: 4, // Меньший приоритет, чем у остальных
		};
	
		// Сортируем задачи по важности
		const sortedTasks = [...tasks].sort(
			(a, b) => importanceOrder[a.importance] - importanceOrder[b.importance]
		);
	
		return sortedTasks.length > 0 ? (
			<div className={clazz}>
				{sortedTasks.map(({ id, task, description, importance, labels }) => {
					const isEditing = editingTaskId === id;
	
					return (
						<div
							key={id}
							className={`task-item ${
								clazz === "completed-tasks-list" ? "completed" : ""
							}`}
							style={{
								borderLeft:
									clazz === "completed-tasks-list"
										? `5px solid ${importanceColors[importance]}`
										: "none",
							}}>
							{isEditing ? (
								<EditTask
									id={id}
									task={task}
									description={description}
									importance={importance}
									labels={labels}
									saveTask={this.saveTask}
									cancelEdit={this.cancelEdit}
									addLabel={addLabel}
									currentLabel={currentLabel}
									allLabels={allLabels}
									updateStateEvent={updateStateEvent}
									updateStateBool={updateStateBool}
									tasks={tasks}
									chosenLabels={chosenLabels}
									onOpenFilterLabel={onOpenFilterLabel}
								/>
							) : (
								<div className='task-view'>
									<div className='task-header'>
										<div
											className='importance-circle'
											onClick={() =>
												this.props.onActionWithTask(id, "completed")
											}
											style={{
												border: `2px solid ${importanceColors[importance]}`,
											}}>
											<Check color={importanceColors[importance]} />
										</div>
										<h3 className='task-name'>
											{task.length > window.innerWidth / 30
												? task.slice(0, window.innerWidth / 30) + "..."
												: task}
										</h3>
										<div className='menu-trigger'>
											{clazz === "completed-tasks-list" ? null : (
												<>
													<img
														src={pencil}
														alt='pencil'
														onClick={() =>
															this.startEditing(id, {
																id,
																task,
																description,
																importance,
																labels,
															})
														}
													/>
													<img
														src={trash}
														alt='trash'
														onClick={() =>
															this.props.onActionWithTask(id, "remove")
														}
													/>
												</>
											)}
	
											{clazz !== "completed-tasks-list" ? null : (
												<>
													<img
														src={refresh}
														alt='refresh'
														onClick={() =>
															this.props.onActionWithTask(id, "refresh")
														}
													/>
													<img
														src={trash}
														alt='trash'
														onClick={() =>
															this.props.onActionWithTask(
																id,
																"remove-completed"
															)
														}
													/>
												</>
											)}
										</div>
									</div>
									<p className='task-description'>
										{description.length > window.innerWidth / 20
											? description.slice(0, window.innerWidth / 20) + "..."
											: description}
									</p>
									<div className='task-labels'>
										{labels.length
											? labels.map((item, index) => (
													<p key={`${item}-${index}`}>{item}</p>
												))
											: null}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		) : clazz === "completed-tasks-list" ? (
			<p>No completed tasks yet</p>
		) : null;
	};

	render() {
		return <>{this.renderItem()}</>;
	}
}

export default Task;
