import { Component } from "react";
import Menu from "../../components/menu/Menu";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

class Labels extends Component {
	render() {
		const { menuOpen, countTasks, updateStateBool } = this.props;
		return (
			<>
				<div className='labels'>
					<Menu
						updateStateBool={updateStateBool}
						menuOpen={menuOpen}
					/>
					<div className={`container${menuOpen ? " menu-active" : ""}`}>
						<h1 className='title'>Labels</h1>
						<p className='count-tasks'>
							<img
								src={countTask}
								alt=''
							/>
							{countTasks} tasks
						</p>
						<CurrentDate />
						<hr className='divider' />
					</div>
				</div>
			</>
		);
	}
}

export default Labels;
