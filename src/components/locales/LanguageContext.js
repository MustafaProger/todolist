import React, { createContext, Component } from "react";

const translations = {
	en: {
		tasks: "Tasks",
		completed: "Completed",
		filter: "Filter",
		labels: "Labels",
		language: "Language",
		english: "English",
		russian: "Russian",
		countTasks: "tasks",
		searchTask: "Type a task name",
		taskName: "Task name",
		description: "Description",
		addTask: "Add Task",
		cancel: "Cancel",
		// month
		january: "January",
		february: "February",
		march: "March",
		april: "April",
		may: "May",
		june: "June",
		july: "July",
		august: "August",
		september: "September",
		october: "October",
		november: "November",
		december: "December",
		// day's week
		sunday: "Sunday",
		monday: "Monday",
		tuesday: "Tuesday",
		wednesday: "Wednesday",
		thursday: "Thursday",
		friday: "Friday",
		saturday: "Saturday",
	},
	ru: {
		tasks: "Задачи",
		completed: "Выполнено",
		filter: "Фильтрация",
		labels: "Метки",
		language: "Язык",
		english: "Английский",
		russian: "Русский",
		countTasks: "задач",
		searchTask: "Введите название задачи",
		taskName: "Введите название задачи",
		description: "Описание",
		addTask: "Добавить задачу",
		cancel: "Отмена",
		// month
		january: "Январь",
		february: "Февраль",
		march: "Март",
		april: "Апрель",
		may: "Май",
		june: "Июнь",
		july: "Июль",
		august: "Август",
		september: "Сентябрь",
		october: "Октябрь",
		november: "Ноябрь",
		december: "Декабрь",
		// day's week
		sunday: "Воскресенье",
		monday: "Понедельник",
		tuesday: "Вторник",
		wednesday: "Среда",
		thursday: "Четверг",
		friday: "Пятница",
		saturday: "Суббота",
	},
};

export const LanguageContext = createContext();

class LanguageProvider extends Component {
	state = {
		language: "en",
	};

	switchLanguage = (language) => {
		this.setState({ language });
	};

	getTranslation = (key) => {
		return translations[this.state.language][key] || key;
	};

	render() {
		return (
			<LanguageContext.Provider
				value={{
					language: this.state.language,
					switchLanguage: this.switchLanguage,
					getTranslation: this.getTranslation,
				}}>
				{this.props.children}
			</LanguageContext.Provider>
		);
	}
}

export default LanguageProvider;
