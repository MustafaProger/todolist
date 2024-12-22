import { Component } from "react";
import Menu from "../../components/menu/Menu";

class Tasks extends Component {
    render() {
        return (
			<div className='tasks'>
				<Menu />
				<h1>Tasks</h1>
			</div>
        )
    }
}

export default Tasks;