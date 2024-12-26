import { Component } from "react";
import Menu from "../../components/menu/Menu";

import "./FiltersLabels.scss";

class FiltersLabels extends Component {
	render() {
		return (
			<div className='filters-labels'>
				<Menu
					updateMenuState={this.props.updateMenuState}
					menuOpen={this.props.menuOpen}
				/>
				<h1>filters-labels</h1>
			</div>
		);
	}
}

export default FiltersLabels;
