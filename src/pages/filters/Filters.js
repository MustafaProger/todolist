import React, { useContext } from "react";
import Filter from "../../components/filter/Filter";
import countTask from "../../assets/icon/check-circle.svg";
import CurrentDate from "../../components/currentDate/CurrentDate";

import { LanguageContext } from "../../components/locales/LanguageContext";
import MyContext from "../../components/context/Context";

const Filters = () => {
	const { getTranslation } = useContext(LanguageContext);
	const { menuOpen, tasksCount } = useContext(MyContext);

	return (
		<div className='filter'>
			<div className={`container${menuOpen ? " menu-active" : ""}`}>
				<h1 className='title'>{getTranslation("filter")}</h1>
				<p className='count-tasks'>
					<img
						src={countTask}
						alt=''
					/>
					{tasksCount} {getTranslation("countTasks")}
				</p>
				<CurrentDate />
				<hr className='divider' />

				<Filter />
			</div>
		</div>
	);
};

export default Filters;
