import { Component } from "react";

class Check extends Component {
	render() {
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill={this.props.color}
				id='Outline'
				viewBox='0 0 24 24'
				width='10'
				height='10'>
				<path d='M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z' />
			</svg>
		);
	}
}

export default Check;