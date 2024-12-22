import { Component } from "react";
import Menu from "../../components/menu/Menu";

class DoneTasks extends Component {
	render() {
		return (
			<div className='done-tasks'>
				<Menu />
				<h1>DoneTasks</h1>
			</div>
		);
	}
}

export default DoneTasks;
