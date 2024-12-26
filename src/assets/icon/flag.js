import { Component } from "react";

class Flag extends Component {
	render() {
		return (
			<>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 100 100'
					width='20'
					height='20'>
					<circle
						cx='50'
						cy='50'
						r='40'
						fill={this.props.theme}
					/>
				</svg>
			</>
		);
	}
}

export default Flag;
