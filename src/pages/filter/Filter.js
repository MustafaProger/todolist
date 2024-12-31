import { Component } from "react";
import Menu from "../../components/menu/Menu";
import Filter from "../../components/filter/Filter";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

class Filters extends Component {
	render() {
		const {
			menuOpen,
			tasks,
			countTasks,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
			editingTask,
			updateStateBool,
			updateStateEvent,
			addLabel,
			allLabels,
			currentLabel,
			chosenLabels,
		} = this.props;

		return (
			<div className='filter'>
				<Menu
					updateStateBool={updateStateBool}
					menuOpen={menuOpen}
				/>
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className='title'>Filter</h1>
					<p className='count-tasks'>
						<img
							src={countTask}
							alt=''
						/>
						{countTasks} tasks
					</p>
					<CurrentDate />
					<hr className='divider' />

					<Filter
						tasks={tasks}
						countTasks={countTasks}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						editingTask={editingTask}
						updateStateEvent={updateStateEvent}
						updateStateBool={updateStateBool}
						addLabel={addLabel}
						allLabels={allLabels}
						currentLabel={currentLabel}
						chosenLabels={chosenLabels}
					/>
				</div>
			</div>
		);
	}
}

export default Filters;
