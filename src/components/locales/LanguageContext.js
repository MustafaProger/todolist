import React, {
	createContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";

const translations = {
	en: {
		tasks: "Tasks",
		completed: "Completed",
		filter: "Filter",
		labels: "Labels",
		language: "Language",
		english: "English",
		russian: "Russian",
		arabian: "Arabian",
		french: "French",
		chinese: "Chinese",
		countTasks: "tasks",
		countTasksCompleted: "completed",
		searchTask: "Type a task name",
		taskName: "Task name",
		description: "Description",
		addTask: "Add Task",
		cancel: "Cancel",
		// importance
		priority: "Priority",
		low: "Low",
		medium: "Medium",
		high: "High",
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
		// label
		searchLabel: "Type a label",
		labelNotFound: "Label not found",
		createLabel: "Create a label",
		// no
		noCompletedTasksYet: "No completed tasks yet",
		noCategoryTasksYet: "So far, we don't have any tasks from this category",
		noLabelTasksYet: "So far, we don't have any tasks from this label",
		noLabelYet: "So far, we don't have any (this) label",
	},
	ru: {
		tasks: "Задачи",
		completed: "Выполнено",
		filter: "Фильтрация",
		labels: "Метки",
		language: "Язык",
		english: "Английский",
		russian: "Русский",
		arabian: "Арабский",
		french: "Французский",
		chinese: "Китайский",
		countTasks: "задач",
		countTasksCompleted: "выполнено",
		searchTask: "Введите название задачи",
		taskName: "Введите название задачи",
		description: "Описание",
		addTask: "Добавить задачу",
		cancel: "Отмена",
		// importance
		priority: "Приоритет",
		low: "Низкий",
		medium: "Средний",
		high: "Высокий",
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
		// label
		searchLabel: "Введите метку",
		labelNotFound: "Метка не найдена",
		createLabel: "Создать метку",
		// no
		noCompletedTasksYet: "Еще нет выполненных заданий",
		noCategoryTasksYet: "Пока что у нас нет никаких задач из этой категории",
		noLabelTasksYet: "Пока что у нас нет никаких заданий с этой меткой",
		noLabelYet: "У вас нет никакой (этой) метки",
	},
	ar: {
		tasks: "المهام",
		completed: "مكتمل",
		filter: "تصفية",
		labels: "التسميات",
		language: "اللغة",
		english: "الإنجليزية",
		russian: "الروسية",
		arabian: "العربية",
		french: "الفرنسية",
		chinese: "الصينية",
		countTasks: "مهام",
		countTasksCompleted: "مكتمل",
		searchTask: "اكتب اسم المهمة",
		taskName: "اسم المهمة",
		description: "الوصف",
		addTask: "إضافة مهمة",
		cancel: "إلغاء",
		// importance
		priority: "الأهمية",
		low: "منخفض",
		medium: "متوسط",
		high: "مرتفع",
		// month
		january: "يناير",
		february: "فبراير",
		march: "مارس",
		april: "أبريل",
		may: "مايو",
		june: "يونيو",
		july: "يوليو",
		august: "أغسطس",
		september: "سبتمبر",
		october: "أكتوبر",
		november: "نوفمبر",
		december: "ديسمبر",
		// day's week
		sunday: "الأحد",
		monday: "الإثنين",
		tuesday: "الثلاثاء",
		wednesday: "الأربعاء",
		thursday: "الخميس",
		friday: "الجمعة",
		saturday: "السبت",
		// label
		searchLabel: "اكتب تسمية",
		labelNotFound: "التسمية غير موجودة",
		createLabel: "إنشاء تسمية",
		// no
		noCompletedTasksYet: "لا توجد مهام مكتملة بعد",
		noCategoryTasksYet: "لا توجد مهام في هذه الفئة حتى الآن",
		noLabelTasksYet: "لا توجد مهام مع هذه التسمية حتى الآن",
		noLabelYet: "لا توجد لديك أي تسمية (هذه)",
	},
};

export const LanguageContext = createContext();

const LanguageProvider = ({ updateStateApp, children }) => {
	const [language, setLanguage] = useState("en");

	const isMounted = useRef(false);

	useEffect(() => {
		const appState = JSON.parse(localStorage.getItem("appState"));
		if (appState?.language) {
			setLanguage(appState.language);
		}
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			updateStateApp("language", language);
		} else {
			isMounted.current = true;
		}
	}, [language, updateStateApp]);

	const switchLanguage = useCallback((newLanguage) => {
		setLanguage(newLanguage);
	}, []);

	const getTranslation = useCallback(
		(key) => translations[language][key] || key,
		[language]
	);

	return (
		<LanguageContext.Provider
			value={{
				language,
				switchLanguage,
				getTranslation,
			}}>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageProvider;
