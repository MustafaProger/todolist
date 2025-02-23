import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./PortalTaskAddedSuccess.scss";

const PortalTaskAddedSuccess = ({ children }) => {
	const [visible, setVisible] = useState(true);
	const node = document.createElement("div");
	node.classList.add("task-added");

	useEffect(() => {
		document.body.appendChild(node);

		const timer = setTimeout(() => {
			setVisible(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
			document.body.removeChild(node);
		};
	}, [node]);

	if (!visible) return null;

	return ReactDOM.createPortal(children, node);
};

export default PortalTaskAddedSuccess;
