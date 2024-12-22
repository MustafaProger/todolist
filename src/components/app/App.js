import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tasks from "../../pages/Tasks/Tasks";
import DoneTasks from "../../pages/doneTasks/DoneTasks";
import AboutAuthor from "../../pages/aboutAuthor/AboutAuthor";

import "./App.css";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Tasks />}
					/>
					<Route
						path='/donetasks'
						element={<DoneTasks />}
					/>
					<Route
						path='/about-author'
						element={<AboutAuthor />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
