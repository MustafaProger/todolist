import { Component } from "react";
import "./Label.scss";

class Label extends Component {
	// Переключение отображения меток

	state = {
		checkedItems: {}, // Объект для отслеживания состояний чекбоксов
	};

	checkboxRefs = {}; // Объект для хранения рефов чекбоксов

	updateStateLabel = () => {
		const newAddLabel = !this.props.addLabel;
		this.props.updateStateBool("addLabel", newAddLabel);
	};

	componentDidMount() {
		const { allLabels, chosenLabels } = this.props;
		const initialCheckedState = allLabels.reduce((acc, label) => {
			acc[label] = chosenLabels.includes(label);  // Проверяем, если метка в chosenLabels, то true, иначе false
			return acc;
		}, {});
	
		this.setState({ checkedItems: initialCheckedState });
	}

	handleCheckboxChange = (label) => {
		this.setState(
			(prevState) => ({
				checkedItems: {
					...prevState.checkedItems,
					[label]: !prevState.checkedItems[label], // Переключаем состояние чекбокса
				},
			}),
			() => {
				// Создаем новый массив выбранных меток на основе состояния чекбоксов
				const checkedItemsKeys = Object.keys(this.state.checkedItems);
				const checkedItemsValues = Object.values(this.state.checkedItems);

				const newArr = checkedItemsKeys.filter(
					(item, index) => checkedItemsValues[index] // Фильтруем выбранные метки
				);

				if (this.props.handleChange) {
					this.props.handleChange("labels", newArr); // Обновляем родительский компонент
				}

				this.props.updateStateEvent("chosenLabels", newArr); // Обновляем состояние в родительском компоненте
			}
		);
	};

	componentDidUpdate(prevProps) {
		// Проверяем, изменились ли метки задачи
		if (this.props.chosenLabels !== prevProps.chosenLabels) {
			const initialCheckedState = this.props.allLabels.reduce((acc, label) => {
				acc[label] = this.props.chosenLabels.includes(label);  // Отмечаем метки задачи как выбранные
				return acc;
			}, {});
	
			this.setState({ checkedItems: initialCheckedState });
		}
	}

	render() {
		const { updateStateEvent, addLabel, allLabels, currentLabel } = this.props;

		// Поиск по меткам
		const arrSearched = allLabels.filter(
			(item) =>
				currentLabel.length === 0 ||
				item.toLowerCase().includes(currentLabel.toLowerCase())
		);

		const { checkedItems } = this.state;

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
							value={currentLabel}
							onChange={(e) => updateStateEvent("currentLabel", e)}
						/>

						<>
							<div>
								{currentLabel.trim() || arrSearched.length ? (
									<>
										<hr className='divider' />
										{arrSearched.length ? (
											<div className='labels__wrapper'>
												{arrSearched.map((item, index) => (
													<div
														className='labels__item'
														key={`${item}-${index}`}
														onClick={() => this.handleCheckboxChange(item)}>
														<svg
															viewBox='0 0 24 24'
															width='15'
															height='15'>
															<path d='M21.68,9.108L13.204,.723C12.655,.173,11.869-.089,11.098,.013L4.209,.955c-.274,.038-.466,.29-.428,.563,.037,.273,.293,.461,.562,.428l6.889-.942c.46-.066,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.01,4.94l-.19,.199c-.209-.677-.58-1.314-1.114-1.848L11.204,4.723c-.549-.55-1.337-.812-2.106-.709l-6.889,.942c-.228,.031-.404,.213-.43,.44l-.765,6.916c-.083,.759,.179,1.503,.72,2.044l8.417,8.326c.85,.85,1.979,1.318,3.181,1.318h.014c1.208-.004,2.341-.479,3.189-1.339l3.167-3.208c.886-.898,1.317-2.081,1.292-3.257l.708-.743c1.732-1.754,1.724-4.6-.022-6.345Zm-2.688,9.643l-3.167,3.208c-.66,.669-1.542,1.039-2.481,1.042h-.011c-.935,0-1.812-.364-2.476-1.027L2.439,13.646c-.324-.324-.48-.77-.431-1.225l.722-6.528,6.502-.889c.462-.063,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.017,4.934ZM8,10c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z' />
														</svg>
														<p>{item}</p>
														<input
															type='checkbox'
															className='labels__item__input'
															checked={checkedItems[item] || false}
															onChange={(e) => e.stopPropagation()}
															ref={(el) => (this.checkboxRefs[item] = el)}
														/>
														<span className='labels__item__checkbox'></span>
													</div>
												))}
											</div>
										) : (
											<p className='labels__undefined'>Label not found</p>
										)}
									</>
								) : null}

								{currentLabel.trim() &&
									!allLabels.includes(currentLabel.trim()) && (
										<div className='create-label'>
											<span></span>
											<p
												onClick={() =>
													updateStateEvent("allLabels", currentLabel.trim())
												}>
												Create "{currentLabel.trim()}"
											</p>
										</div>
									)}
							</div>
						</>
					</div>
				)}
			</div>
		);
	}
}

export default Label;
