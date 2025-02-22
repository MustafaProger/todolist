import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../locales/LanguageContext";

const CurrentDate = () => {
	const { getTranslation } = useContext(LanguageContext);

	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const monthIndex = date.getMonth();
	const dayIndex = date.getDay();
	const day = date.getDate();
	const year = date.getFullYear();

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

	const weekDays = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];

	const formattedDate = `${day} ${getTranslation(
		monthNames[monthIndex]
	)}, ${getTranslation(weekDays[dayIndex])} • ${year}`;

	return (
		<div>
			<h3 className='current-date'>{formattedDate}</h3>
		</div>
	);
};

export default CurrentDate;
