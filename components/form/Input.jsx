import React from "react";

const Input = (props) => {
	const { type, placeholder, touched, errorMessage, ...inputs } = props;

	return (
		<div className="w-full">
			<label className="relative block cursor-text w-full">
				<input type={type} className={`h-14 w-full  outline-none px-4 peer ${type !== "datetime-local" && "pt-2"} border ${touched && errorMessage ? "border-danger" : "border-primary"}`} {...inputs} required />
				{props.type !== "datetime-local" && <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">{placeholder}</span>}
			</label>
			{touched && <span className="text-xs text-danger">{errorMessage}</span>}
		</div>
	);
};

export default Input;
