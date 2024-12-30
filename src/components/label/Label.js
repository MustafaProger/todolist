import { Component } from "react";
import "./Label.scss";

class Label extends Component {
	updateStateLabel = () => {
		const newAddLabel = !this.props.addLabel;
		this.props.updateStateBool("addLabel", newAddLabel);
	};

	render() {
		return (
			<div className='add-task__form__labels'>
				<div
					className='add-task__button add-task__form__labels__button'
					onClick={this.updateStateLabel}>
					<span></span>
					<p>Labels</p>
				</div>
				{this.props.addLabel && (
					<div className='input-and-labels__wrapper'>
						<input
							className='input-label'
							type='text'
							placeholder='Type a label'
							onChange={(e) => this.props.updateStateEvent("currentLabel", e)}
						/>
						{this.props.currentLabel && (
							<>
								<hr className='divider' />
								<div className='labels'>
									{this.props.allLabels.length
										? this.props.allLabels.map((item, index) => <p>{item}</p>)
										: null}
									<p className='labels__undefined'>Label not found</p>
									<div className='create-label'>
										<span></span>
										<p
											onClick={() =>
												this.props.updateStateEvent(
													"allLabels",
													this.props.currentLabel
												)
											}>
											Create "{this.props.currentLabel}"
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Label;
