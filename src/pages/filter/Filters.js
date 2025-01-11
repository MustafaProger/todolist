import { Component } from "react";
import Menu from "../../components/menu/Menu";
import Filter from "../../components/filter/Filter";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

import { LanguageContext } from "../../components/locales/LanguageContext";

class Filters extends Component {
	static contextType = LanguageContext;

	render() {
		const {
			menuOpen,
			tasksCount,
			tasks,
			allLabels,
			updateStateApp,
			updateStateEvent,
			onActionWithTask,
			editTaskFunc,
			onSaveTask,
			onOpenFilterLabel,
			completedTasks,
		} = this.props;

		const { getTranslation } = this.context;

		return (
			<div className='filter'>
				<div className={`container${menuOpen ? " menu-active" : ""}`}>
					<h1 className='title'>{getTranslation("filter")}</h1>
					<p className='count-tasks'>
						<img
							src={countTask}
							alt=''
						/>
						{tasksCount} {getTranslation('countTasks')}
					</p>
					<CurrentDate />
					<hr className='divider' />

					<Filter
						tasks={tasks}
						tasksCount={tasksCount}
						allLabels={allLabels}
						updateStateApp={updateStateApp}
						updateStateEvent={updateStateEvent}
						onActionWithTask={onActionWithTask}
						editTaskFunc={editTaskFunc}
						onSaveTask={onSaveTask}
						onOpenFilterLabel={onOpenFilterLabel}
						completedTasks={completedTasks}
					/>
				</div>
			</div>
		);
	}
}

export default Filters;
