import React, { Component } from "react";
import { LanguageContext } from "../locales/LanguageContext";

class CurrentDate extends Component {
	static contextType = LanguageContext; // Указываем контекст

	state = {
		date: new Date(),
	};

	render() {
		const { date } = this.state;
		const { getTranslation } = this.context; // Получаем getTranslation из контекста

		// Получаем номер месяца (0-11) и дня недели (0-6)
		const monthIndex = date.getMonth();
		const dayIndex = date.getDay(); // Получаем день недели
		const day = date.getDate();
		const year = date.getFullYear();

		// Массив названий месяцев
		const monthNames = [
			"january",
			"february",
			"march",
			"april",
			"may",
			"june",
			"july",
			"august",
			"september",
			"october",
			"november",
			"december",
		];

		// Массив названий дней недели
		const weekDays = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];

		// Форматирование даты в зависимости от языка
		const formattedDate = `${day} ${getTranslation(
			monthNames[monthIndex]
		)}, ${getTranslation(weekDays[dayIndex])} • ${year}`;

		return (
			<div>
				<h3 className='current-date'>{formattedDate}</h3>
			</div>
		);
	}
}

export default CurrentDate;
