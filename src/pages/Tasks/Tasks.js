import { Component } from "react";
import Menu from "../../components/menu/Menu";
import CurrentDate from "../../components/currentDate/CurrentDate";
import AddTask from "../../components/addTask/AddTask";
import Task from "../../components/task/Task";

import "./Tasks.scss";

class Tasks extends Component {
	state = {
		countTasks: 2,
		addTask: false,
		task: "",
		description: "",
		importance: "Priority",
		tasks: [
			{
				id: 1,
				task: "🕋 Read book about Tawhid",
				description: "read the chapter 45",
				importance: "Medium",
			},
			{
				id: 2,
				task: "💻 Programming",
				description: "Work with web-site",
				importance: "High",
			},
		],
	};

	onClickAddСancel = () => {
		this.setState(({ addTask }) => ({ addTask: !addTask }));
	};

	updateState = (prop, event) => {
		this.setState({ [prop]: event.target.value });
	};

	updateStatePriority = (value) => {
		this.setState({ importance: value });
	};

	onTask = () => {
		const { task, description, tasks, importance } = this.state;

		if (!task.trim()) {
			alert("Task name cannot be empty.");
			return;
		}

		const newTask = {
			id: Date.now(),
			task,
			description,
			importance,
		};

		this.setState({
			tasks: [...tasks, newTask],
			task: "",
			description: "",
			countTasks: tasks.length + 1,
			addTask: false,
		});
	};

	updateTask = (id, updatedFields) => {
		this.setState((prevState) => ({
			tasks: prevState.tasks.map((task) =>
				task.id === id ? { ...task, ...updatedFields } : task
			),
		}));
	};

	editTask = (id) => {
		console.log("Edit task with ID:", id);
	};

	render() {
		const { countTasks, addTask } = this.state;

		return (
			<div className='tasks'>
				<Menu
					updateMenuState={this.props.updateMenuState}
					menuOpen={this.props.menuOpen}
				/>
				<div
					className={`container` + (this.props.menuOpen ? " menu-active" : "")}>
					<h1 className='title'>Tasks</h1>
					<p className='count-tasks'>
						<svg
							version='1.0'
							width='15'
							height='15'
							viewBox='0 0 140.000000 128.000000'
							preserveAspectRatio='xMidYMid meet'>
							<g
								transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
								fill='grey'
								stroke='none'>
								<path
									d='M622 1239 c-82 -10 -121 -23 -206 -67 -133 -69 -247 -212 -291 -367
	-23 -77 -23 -220 -1 -304 52 -202 215 -367 421 -426 77 -23 220 -23 304 -1
	202 52 367 215 426 421 23 77 23 220 1 304 -75 289 -358 479 -654 440z m209
	-105 c158 -47 280 -156 340 -305 31 -76 38 -224 14 -304 -47 -163 -153 -283
	-306 -347 -46 -19 -73 -22 -174 -22 -102 -1 -128 3 -177 22 -138 55 -248 163
	-299 292 -45 117 -36 287 23 405 65 130 209 243 338 268 60 11 189 6 241 -9z'
								/>
								<path
									d='M940 843 c-8 -3 -88 -78 -177 -166 l-162 -161 -69 66 c-54 53 -74 66
	-91 61 -28 -7 -45 -38 -32 -60 15 -29 177 -183 192 -183 7 0 100 87 206 193
	164 163 192 195 186 215 -6 26 -31 42 -53 35z'
								/>
							</g>
						</svg>
						{countTasks} tasks
					</p>
					<CurrentDate />
					<hr className='divider' />

					<Task
						tasks={this.state.tasks}
						updateTask={this.updateTask}
						editTask={this.editTask}
					/>

					{/* Кнопка Add Task */}
					<AddTask
						addTaskState={addTask}
						addTaskFunc={this.onClickAddСancel}
						updateState={this.updateState}
						updateStatePriority={this.updateStatePriority}
						onTask={this.onTask}
					/>
				</div>
			</div>
		);
	}
}

export default Tasks;
