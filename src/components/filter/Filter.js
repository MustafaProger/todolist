import React, { useState, useContext } from "react";
import "./Filter.scss";
import Flag from "../../assets/icon/flag";
import Task from "../task/Task";
import { LanguageContext } from "../locales/LanguageContext";
import MyContext from "../context/Context";

const Filter = () => {
	const [openCategory, setOpenCategory] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const { getTranslation } = useContext(LanguageContext);
	const { tasks } = useContext(MyContext);

	const options = [
		{ value: "High", icon: <Flag theme='#FF6247' /> },
		{ value: "Medium", icon: <Flag theme='orange' /> },
		{ value: "Low", icon: <Flag theme='#5390F5' /> },
		{ value: "Priority", icon: <Flag theme='#CDCDCD' /> },
	];

	const handleToggleCategory = (category) => {
		setOpenCategory((prevState) => (prevState === category ? null : category));
		setIsOpen((prevState) => prevState !== category);
	};

	const onOpenFilterLabel = (label, clazz) => {
		const allTasks = document.querySelectorAll(`.${clazz}`);
		allTasks.forEach((task) => {
			task.style.maxHeight = "0px";
		});

		const content = document.querySelector(`.${clazz}-${label}`);
		if (content && openCategory !== label) {
			content.style.maxHeight = `${content.scrollHeight * 1}px`;
		}
	};

	return (
		<div className='filtered'>
			{options.map(({ value, icon }, id) => {
				const filteredTask = tasks.filter((item) => item.importance === value);
				const taskCount = filteredTask.length;

				return (
					<div
						key={id}
						className='filtered-item'>
						<div
							className='importance'
							onClick={() => {
								handleToggleCategory(value);
								onOpenFilterLabel(value, "filtered-task");
							}}>
							{icon}{" "}
							<span>{getTranslation(`${value.toLocaleLowerCase()}`)}</span>
							<div className='toggle-icon'>
								<span className='task-count'>{taskCount}</span>
								{openCategory === value ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										id='Outline'
										viewBox='0 0 24 24'
										width='25'
										height='25'>
										<path d='M18,15.5a1,1,0,0,1-.71-.29l-4.58-4.59a1,1,0,0,0-1.42,0L6.71,15.21a1,1,0,0,1-1.42-1.42L9.88,9.21a3.06,3.06,0,0,1,4.24,0l4.59,4.58a1,1,0,0,1,0,1.42A1,1,0,0,1,18,15.5Z' />
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										id='Outline'
										viewBox='0 0 24 24'
										width='25'
										height='25'>
										<path d='M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z' />
									</svg>
								)}
							</div>
						</div>
						<div
							className={`filtered-task filtered-task-${value} ${
								value === openCategory && isOpen ? "open" : ""
							}`}>
							{filteredTask.length ? (
								<Task
									clazz={"tasks-list"}
									allTasks={tasks}
									tasks={filteredTask}
								/>
							) : (
								<p className='no-task'>
									{getTranslation("noCategoryTasksYet")}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Filter;
