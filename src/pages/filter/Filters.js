import { Component } from "react";
import Menu from "../../components/menu/Menu";
import Filter from "../../components/filter/Filter";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

class Filters extends Component {
	render() {
		const {
			menuOpen,
			countTasks,
			tasks,
			addLabel,
			allLabels,
			currentLabel,
			chosenLabels,
			updateStateBool,
			updateStateEvent,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
			editingTask,
			onOpenFilterLabel,
			theme
		} = this.props;

		return (
			<div className='filter'>
				<Menu
					updateStateBool={updateStateBool}
					menuOpen={menuOpen}
					theme={theme}
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
						addLabel={addLabel}
						allLabels={allLabels}
						currentLabel={currentLabel}
						chosenLabels={chosenLabels}
						updateStateBool={updateStateBool}
						updateStateEvent={updateStateEvent}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						editingTask={editingTask}
						onOpenFilterLabel={onOpenFilterLabel}
					/>
				</div>
			</div>
		);
	}
}

export default Filters;
