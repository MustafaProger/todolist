import { Component } from "react";
import Menu from "../../components/menu/Menu";

class Tasks extends Component {
	render() {
		return (
			<div className='tasks'>
				<Menu
					updateMenuState={this.props.updateMenuState}
					menuOpen={this.props.menuOpen}
				/>
				<h1>Tasks</h1>
			</div>
		);
	}
}

export default Tasks;
