import { Component } from "react";
import Menu from "../../components/menu/Menu";
import Filter from "../../components/filter/Filter";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

class Filters extends Component {
	render() {
		const {
			menuOpen,
			tasksCount,
			tasks,
			allLabels,
			updateStateBool,
			updateStateEvent,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
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
						{tasksCount} tasks
					</p>
					<CurrentDate />
					<hr className='divider' />

					<Filter
						tasks={tasks}
						tasksCount={tasksCount}
						allLabels={allLabels}
						updateStateBool={updateStateBool}
						updateStateEvent={updateStateEvent}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						onOpenFilterLabel={onOpenFilterLabel}
					/>
				</div>
			</div>
		);
	}
}

export default Filters;
