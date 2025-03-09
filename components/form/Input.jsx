import React from "react";

const Input = (props) => {
	console.log(props)
	return (
		<div className="w-full">
			<label className="relative block cursor-text w-full">
				<input type={props.type} className="h-14 w-full border border-primary outline-none px-4 peer" required />
				<span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">{props.placeholder}</span>
			</label>
		</div>
	);
};

export default Input;
