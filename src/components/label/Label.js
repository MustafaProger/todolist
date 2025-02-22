import React, { useState, useEffect, useContext } from "react";
import "./Label.scss";
import { LanguageContext } from "../locales/LanguageContext";
import MyContext from "../context/Context";

const Label = ({
	updateStateApp,
	currentLabel,
	completedTasks,
	chosenLabels,
	updateState,
}) => {
	const { getTranslation } = useContext(LanguageContext);
	const { allLabels, tasks } = useContext(MyContext);

	const [checkedItems, setCheckedItems] = useState({});
	const [isOpenLabels, setIsOpenLabels] = useState(false);
	const [deleteLabels, setDeleteLabels] = useState(false);
	const [chosenLabelState, setChosenLabelState] = useState([...chosenLabels]);

	const checkboxRefs = {};

	useEffect(() => {
		const initialCheckedState = allLabels.reduce((acc, label) => {
			acc[label] = chosenLabels.includes(label);
			return acc;
		}, {});
		setCheckedItems(initialCheckedState);
	}, [allLabels, chosenLabels]);

	const handleCheckboxChange = (label) => {
		setCheckedItems((prevCheckedItems) => {
			const updatedCheckedItems = {
				...prevCheckedItems,
				[label]: !prevCheckedItems[label],
			};

			const newChosenLabels = Object.keys(updatedCheckedItems).filter(
				(key) => updatedCheckedItems[key]
			);

			setChosenLabelState(newChosenLabels);

			if (updateState) {
				updateState("chosenLabels", newChosenLabels);
			}

			return updatedCheckedItems;
		});
	};

	const deleteCheckbox = (label) => {
		const newArr = allLabels.filter((item) => item !== label);
		updateStateApp("allLabels", newArr);

		setCheckedItems((prevCheckedItems) => {
			const { [label]: _, ...updatedCheckedItems } = prevCheckedItems;
			return updatedCheckedItems;
		});

		const checkedItemsKeys = Object.keys(checkedItems);
		const checkedItemsValues = Object.values(checkedItems);

		const newChosenLabels = checkedItemsKeys.filter(
			(item, index) => checkedItemsValues[index]
		);

		updateState("chosenLabels", newChosenLabels);

		delete checkboxRefs[label];

		tasks.forEach(({ labels }, index) => {
			const newLabels = labels.filter(
				(label) => checkedItems[label] !== undefined
			);
			tasks[index].labels = newLabels;
		});

		completedTasks.forEach(({ labels }, index) => {
			const newLabels = labels.filter(
				(label) => checkedItems[label] !== undefined
			);
			completedTasks[index].labels = newLabels;
		});
	};

	const arrSearched = allLabels.filter(
		(item) =>
			currentLabel.length === 0 ||
			item.toLowerCase().includes(currentLabel.toLowerCase())
	);

	return (
		<div className={`edit-task__form__labels ${isOpenLabels ? "active" : ""}`}>
			<div
				className='edit-task__button edit-task__form__labels__button'
				onClick={() => setIsOpenLabels(!isOpenLabels)}>
				<span></span>
				<p>{getTranslation("labels")}</p>
			</div>

			<div className='edit-task__form__labels__input__checkboxes'>
				<input
					className='input-label'
					type='text'
					placeholder={getTranslation("searchLabel")}
					value={currentLabel}
					onChange={(e) => updateState("currentLabel", e.target.value)}
				/>

				{currentLabel.trim() || arrSearched.length ? (
					<>
						<hr className='divider' />
						{arrSearched.length ? (
							<div className='checkboxes__wrapper'>
								{!deleteLabels
									? arrSearched.map((item, index) => (
											<div
												className='checkboxes__item'
												key={`${item}-${index}`}
												onClick={() => handleCheckboxChange(item)}>
												<svg
													viewBox='0 0 24 24'
													width='15'
													height='15'>
													<path d='M21.68,9.108L13.204,.723C12.655,.173,11.869-.089,11.098,.013L4.209,.955c-.274,.038-.466,.29-.428,.563,.037,.273,.293,.461,.562,.428l6.889-.942c.46-.066,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.01,4.94l-.19,.199c-.209-.677-.58-1.314-1.114-1.848L11.204,4.723c-.549-.55-1.337-.812-2.106-.709l-6.889,.942c-.228,.031-.404,.213-.43,.44l-.765,6.916c-.083,.759,.179,1.503,.72,2.044l8.417,8.326c.85,.85,1.979,1.318,3.181,1.318h.014c1.208-.004,2.341-.479,3.189-1.339l3.167-3.208c.886-.898,1.317-2.081,1.292-3.257l.708-.743c1.732-1.754,1.724-4.6-.022-6.345Zm-2.688,9.643l-3.167,3.208c-.66,.669-1.542,1.039-2.481,1.042h-.011c-.935,0-1.812-.364-2.476-1.027L2.439,13.646c-.324-.324-.48-.77-.431-1.225l.722-6.528,6.502-.889c.462-.063,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.017,4.934ZM8,10c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z' />
												</svg>
												<p>{item}</p>
												<input
													type='checkbox'
													className='input__checkbox'
													checked={checkedItems[item] || false}
													onChange={(e) => e.stopPropagation()}
													ref={(el) => (checkboxRefs[item] = el)}
												/>
												<span className='custom-checkbox'></span>
											</div>
									  ))
									: arrSearched.map((item, index) => (
											<div
												className='checkboxes__item checkboxes__item_delete'
												style={{
													animationDelay: `${Math.random() * 0.2}s`,
												}}
												key={`${item}-${index}`}
												onClick={() => deleteCheckbox(item)}>
												<svg
													viewBox='0 0 24 24'
													width='15'
													height='15'>
													<path d='M21.68,9.108L13.204,.723C12.655,.173,11.869-.089,11.098,.013L4.209,.955c-.274,.038-.466,.29-.428,.563,.037,.273,.293,.461,.562,.428l6.889-.942c.46-.066,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.01,4.94l-.19,.199c-.209-.677-.58-1.314-1.114-1.848L11.204,4.723c-.549-.55-1.337-.812-2.106-.709l-6.889,.942c-.228,.031-.404,.213-.43,.44l-.765,6.916c-.083,.759,.179,1.503,.72,2.044l8.417,8.326c.85,.85,1.979,1.318,3.181,1.318h.014c1.208-.004,2.341-.479,3.189-1.339l3.167-3.208c.886-.898,1.317-2.081,1.292-3.257l.708-.743c1.732-1.754,1.724-4.6-.022-6.345Zm-2.688,9.643l-3.167,3.208c-.66,.669-1.542,1.039-2.481,1.042h-.011c-.935,0-1.812-.364-2.476-1.027L2.439,13.646c-.324-.324-.48-.77-.431-1.225l.722-6.528,6.502-.889c.462-.063,.934,.095,1.267,.427l8.476,8.385c1.356,1.356,1.363,3.569,.017,4.934ZM8,10c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z' />
												</svg>
												<p>{item}</p>
												<div className='button-delete__label'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														id='Outline'
														viewBox='0 0 24 24'
														width='10'
														height='10'>
														<path d='M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z' />
													</svg>
												</div>
											</div>
									  ))}
							</div>
						) : (
							<p className='labels__undefined'>
								{getTranslation("labelNotFound")}
							</p>
						)}
					</>
				) : null}

				{currentLabel.trim() && !allLabels.includes(currentLabel.trim()) && (
					<div className='create-label'>
						<span></span>
						<p onClick={() => updateStateApp("allLabels", currentLabel.trim())}>
							{getTranslation("createLabel")} "{currentLabel.trim()}"
						</p>
					</div>
				)}

				{arrSearched.length ? (
					<div
						className='delete-labels'
						onClick={() => setDeleteLabels(!deleteLabels)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='white'
							id='Outline'
							viewBox='0 0 24 24'
							width='20'
							height='20'>
							<path d='M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z' />
							<path d='M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z' />
							<path d='M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z' />
						</svg>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Label;
