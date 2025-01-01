import { Component } from "react";
import "./Search.scss";

class Search extends Component {
	render() {
		const { placeholder } = this.props;
		return (
			<div className='search'>
				<div className='search__inner'>
					<div className='search__container'>
						<div className='icon'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#657789'
								strokeWidth='3'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='feather feather-search'>
								<circle
									cx='11'
									cy='11'
									r='8'
								/>
								<line
									x1='21'
									y1='21'
									x2='16.65'
									y2='16.65'
								/>
							</svg>
						</div>
						<div className='container__input'>
							<input
								placeholder={placeholder}
								onChange={(e) => this.props.updateStateEvent("term", e)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Search;
