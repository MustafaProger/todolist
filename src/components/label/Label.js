import { Component } from "react";
import "./Label.scss";

class Label extends Component {
	updateStateLabel = () => {
		const newAddLabel = !this.props.addLabel;
		this.props.updateStateBool("addLabel", newAddLabel);
	};

	render() {
		const { updateStateEvent, addLabel, allLabels, currentLabel } = this.props;

		const arrSearched = allLabels.filter(
			(item) => currentLabel.length === 0 || item.includes(currentLabel)
		);
		return (
			<div className='add-task__form__labels'>
				<div
					className='add-task__button add-task__form__labels__button'
					onClick={this.updateStateLabel}>
					<span></span>
					<p>Labels</p>
				</div>

				{addLabel && (
					<div className='input-and-labels__wrapper'>
						<input
							className='input-label'
							type='text'
							placeholder='Type a label'
							value={currentLabel} // Привязываем поле ввода к состоянию
							onChange={(e) => updateStateEvent("currentLabel", e)} // Передаем только значение
						/>

						<>
							<div>
								{currentLabel.trim() || arrSearched.length ? (
									<>
										<hr className='divider' />
										{arrSearched.length ? (
											<div className='labels'>
												{arrSearched.map((item, index) => (
													<p key={`${item}-${index}`}>{item}</p>
												))}
											</div>
										) : (
											<p className='labels__undefined'>Label not found</p>
										)}
									</>
								) : null}

								{currentLabel.trim()
									? !allLabels.includes(currentLabel.trim()) && (
											<>
												<div className='create-label'>
													<span></span>
													<p
														onClick={() =>
															updateStateEvent("allLabels", currentLabel.trim())
														}>
														Create "{currentLabel.trim()}"
													</p>
												</div>
											</>
									  )
									: null}
							</div>
						</>
					</div>
				)}
			</div>
		);
	}
}

export default Label;
