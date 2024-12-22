import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tasks from "../../pages/Tasks/Tasks";
import DoneTasks from "../../pages/doneTasks/DoneTasks";
import AboutAuthor from "../../pages/aboutAuthor/AboutAuthor";

import "./App.css";
import { Component } from "react";

class App extends Component {
	state = {
		menuOpen: false,
	};

	updateMenuState = (bool) => {
		return this.setState({ menuOpen: bool });
	};

	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={
								<Tasks
									updateMenuState={this.updateMenuState}
									menuOpen={this.state.menuOpen}
								/>
							}
						/>
						<Route
							path='/donetasks'
							element={
								<DoneTasks
									updateMenuState={this.updateMenuState}
									menuOpen={this.state.menuOpen}
								/>
							}
						/>
						<Route
							path='/about-author'
							element={
								<AboutAuthor
									updateMenuState={this.updateMenuState}
									menuOpen={this.state.menuOpen}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
