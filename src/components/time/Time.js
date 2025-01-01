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
		this.props.updateStateBool("time", newValue?.format("HH:mm"));
	};

	render() {
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker
					className='time'
					value={this.state.time}
					onChange={this.handleTimeChange}
				/>
			</LocalizationProvider>
		);
	}
}

export default Time;
