import { Component } from "react";
import Menu from "../../components/menu/Menu";

class AboutAuthor extends Component {
	render() {
		return (
			<div className='about-author'>
				<Menu
					updateMenuState={this.props.updateMenuState}
					menuOpen={this.props.menuOpen}
				/>
				<h1>about-author</h1>
			</div>
		);
	}
}

export default AboutAuthor;
