import { Component } from "react";
import Menu from "../../components/menu/Menu";

class DoneTasks extends Component {
	render() {
		return (
			<div className='done-tasks'>
				<Menu
					updateMenuState={this.props.updateMenuState}
					menuOpen={this.props.menuOpen}
				/>
				<h1>DoneTasks</h1>
			</div>
		);
	}
}

export default DoneTasks;
