import React, { useState, useEffect, useContext } from "react";
import "./Task.scss";
import Check from "../../assets/icon/check";
import pencil from "../../assets/icon/pencil.svg";
import trash from "../../assets/icon/trash.svg";
import refresh from "../../assets/icon/refresh.svg";
import EditTask from "../editTask/EditTask";

import { LanguageContext } from "../locales/LanguageContext";
import MyContext from "../context/Context";

const Task = ({
	tasks,
	clazz,
	sortedBy,
	search,
}) => {
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editedTask, setEditedTask] = useState({});

	const { getTranslation } = useContext(LanguageContext);
	const {  onActionWithTask, updateStateApp } = useContext(MyContext);

	useEffect(() => {
		if (updateStateApp && sortedBy === "task") {
			updateStateApp("term", "");
		}
	}, [updateStateApp, sortedBy]);

	const startEditing = (id, taskData) => {
		setEditingTaskId(id);
		setEditedTask({ ...taskData });
	};

	const cancelEdit = () => {
		setEditingTaskId(null);
		setEditedTask({});
	};

	const isTimeExpired = (taskTime) => {
		const currentTime = new Date();
		const [taskHours, taskMinutes] = taskTime.split(":").map(Number);
		const taskDate = new Date(
			currentTime.getFullYear(),
			currentTime.getMonth(),
			currentTime.getDate(),
			taskHours,
			taskMinutes
		);
		return currentTime > taskDate;
	};

	const importanceColors = {
		Priority: "#CDCDCD",
		Low: "#5390F5",
		Medium: "orange",
		High: "#FF6247",
	};

	const importanceOrder = {
		High: 1,
		Medium: 2,
		Low: 3,
		Priority: 4,
	};

	const sortedTasks = [...tasks].sort((a, b) => {
		const timeA = a.time ? new Date(`1970-01-01T${a.time}:00`) : null;
		const timeB = b.time ? new Date(`1970-01-01T${b.time}:00`) : null;

		if (!timeA && timeB) return 1;
		if (timeA && !timeB) return -1;

		if (timeA && timeB) {
			if (timeA - timeB !== 0) {
				return timeA - timeB;
			}
		}

		return importanceOrder[a.importance] - importanceOrder[b.importance];
	});

	const sortedBySearch =
		sortedBy === "task" ? search(sortedTasks, "task") : sortedTasks;

	const renderItem = () => {
		return sortedBySearch.length > 0 ? (
			<div className={clazz}>
				{sortedBySearch.map(
					({ id, task, description, importance, labels, time }) => {
						const isEditing = editingTaskId === id;
						const isExpired = time ? isTimeExpired(time) : false;

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
										time={time}
										cancelEdit={cancelEdit}
									/>
								) : (
									<div className='task-view'>
										<div className='task-header'>
											<div
												className='importance-circle'
												onClick={() => onActionWithTask(id, "completed")}
												style={{
													border: `2px solid ${importanceColors[importance]}`,
												}}>
												<Check color={importanceColors[importance]} />
											</div>
											<h4 className='task-name'>{task}</h4>
											<div className='menu-trigger'>
												{clazz === "completed-tasks-list" ? null : (
													<>
														<img
															src={pencil}
															alt='pencil'
															onClick={() =>
																startEditing(id, {
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
															onClick={() => onActionWithTask(id, "remove")}
														/>
													</>
												)}

												{clazz !== "completed-tasks-list" ? null : (
													<>
														<img
															src={refresh}
															alt='refresh'
															onClick={() => onActionWithTask(id, "refresh")}
														/>
														<img
															src={trash}
															alt='trash'
															onClick={() =>
																onActionWithTask(id, "remove-completed")
															}
														/>
													</>
												)}
											</div>
										</div>
										<div className='task-description'>
											{description.length ? (
												<div className='task-description__container'>
													{description}
												</div>
											) : null}
										</div>
										<div className='task-labels'>
											{labels.length ? (
												<div className='task-labels__container'>
													{labels.map((item, index) => (
														<p key={`${item}-${index}`}>{item}</p>
													))}
												</div>
											) : null}
										</div>
										<div className='task-time'>
											{time ? (
												<div className='task-time__container'>
													{!isExpired ? (
														<svg
															id='Layer_1'
															data-name='Layer 1'
															viewBox='0 0 24 24'
															width='15'
															height='15'
															fill='green'>
															<path
																fill='green'
																d='M17,10.039c-3.859,0-7,3.14-7,7,0,3.838,3.141,6.961,7,6.961s7-3.14,7-7c0-3.838-3.141-6.961-7-6.961Zm0,11.961c-2.757,0-5-2.226-5-4.961,0-2.757,2.243-5,5-5s5,2.226,5,4.961c0,2.757-2.243,5-5,5Zm1.707-4.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1-1c-.188-.188-.293-.442-.293-.707v-2c0-.552,.447-1,1-1s1,.448,1,1v1.586l.707,.707Zm5.293-10.293v2c0,.552-.447,1-1,1s-1-.448-1-1v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v1H11c.552,0,1,.448,1,1s-.448,1-1,1H2v9c0,1.654,1.346,3,3,3h4c.552,0,1,.448,1,1s-.448,1-1,1H5c-2.757,0-5-2.243-5-5V7C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z'
															/>
														</svg>
													) : (
														<svg
															version='1.1'
															viewBox='0 0 512 512'
															width='15'
															height='15'
															fill='red'>
															<path
																fill='red'
																d='M354.773,61.867c-16.789-14.229-34.389-29.184-52.309-45.483C288.717,3.882,270.151-1.912,251.733,0.555  c-17.848,2.358-33.728,12.517-43.349,27.733c-25.43,42.496-43.41,89.025-53.163,137.579c-3.827-5.526-7.222-11.338-10.155-17.387  c-10.104-21.288-35.552-30.355-56.84-20.251c-5.154,2.446-9.765,5.901-13.56,10.16c-35.783,36.566-55.62,85.821-55.168,136.981  c-1.017,107.532,71.314,201.943,175.403,228.95c19.367,4.873,39.251,7.394,59.221,7.509c0.64,0,7.445-0.064,10.197-0.256  c127.36-4.125,228.426-108.648,228.267-236.075C492.501,178.859,428.672,124.672,354.773,61.867z M253.589,469.013  c-15.877-1.208-31.567-7.639-43.413-17.195c-18.55-13.126-30.825-32.374-33.749-54.549c-3.627-34.603,17.707-79.851,61.291-130.965  l0,0c4.57-5.338,11.256-8.397,18.283-8.363l0,0c6.936-0.05,13.532,3.001,17.984,8.32c39.936,47.403,61.867,91.136,61.867,123.157  c-0.123,42.07-33.006,75.35-74.88,79.403C259.133,468.999,256,469.269,253.589,469.013z M374.955,428.437  c-1.259,0.981-2.645,1.771-3.925,2.709c4.922-13.378,7.457-27.516,7.488-41.771c0-53.909-39.147-111.68-71.957-150.656  c-12.553-14.867-31.017-23.451-50.475-23.467H256c-19.497-0.035-38.028,8.49-50.688,23.317l0,0  c-52.16,61.099-76.117,115.989-71.211,163.157c1.165,10.95,3.962,21.664,8.299,31.787c-50.658-36.706-80.507-95.587-80.171-158.144  c-0.412-40.639,15.614-79.721,44.437-108.373c4.921,10.23,10.83,19.954,17.643,29.035c9.357,12.65,25.342,18.52,40.661,14.933  c15.619-3.455,27.746-15.774,30.955-31.445c8.571-45.304,24.95-88.774,48.405-128.469c2.886-4.538,7.653-7.544,12.992-8.192  c5.967-0.803,11.982,1.08,16.427,5.141c18.304,16.64,36.267,32,53.333,46.443c71.211,60.48,122.688,104.171,122.688,181.056  c0.184,59.833-27.436,116.358-74.752,152.981L374.955,428.437z'
															/>
														</svg>
													)}
													<p style={{ color: !isExpired ? "green" : "red" }}>
														{time}
													</p>
												</div>
											) : null}
										</div>
									</div>
								)}
							</div>
						);
					}
				)}
			</div>
		) : clazz === "completed-tasks-list" ? (
			<p
				className='no-task-found'
				style={{ color: "gray" }}>
				{getTranslation("noCompletedTasksYet")}
			</p>
		) : null;
	};

	return renderItem();
};

export default Task;
