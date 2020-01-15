import React from "react";

function Grid(props) {
	const {id, content, handleChange, won} = props;
	let className;
	won ? (className = "grid won") : (className = "grid");
	return (
		<div className={className} onClick={handleChange} id={id}>
			{content}
		</div>
	);
}

export default Grid;
