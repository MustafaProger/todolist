import { Component } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./Time.scss";

class Time extends Component {
	state = {
		time: null,
	};

	handleTimeChange = (newValue) => {
		this.setState({ time: newValue }, () => {
			if (this.props.handleChange) {
				this.props.handleChange("time", newValue?.format("HH:mm"));
			}
		});
		this.props.updateState("time", newValue?.format("HH:mm"));
	};

	componentDidUpdate(prevProps) {
		if (prevProps.resetSignal !== this.props.resetSignal) {
			this.setState({ time: null }); // Сброс состояния
		}
	}

	render() {
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className='time'>
					<svg
						className='clock'
						focusable='false'
						aria-hidden='true'
						viewBox='0 0 24 24'
						width={20}
						height={20}
						data-testid='ClockIcon'>
						<path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path>
						<path d='M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'></path>
					</svg>
					<TimePicker
						value={this.state.time}
						onChange={this.handleTimeChange}></TimePicker>
				</div>
			</LocalizationProvider>
		);
	}
}

export default Time;
