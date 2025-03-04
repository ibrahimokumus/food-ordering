import React from "react";

const Input = () => {
	//Todo  22 video
	return (
		<div className="w-full">
			<label className="relative block">
				<input type="text" className="h-14 w-full border border-primary outline-none px-4 peer" />
				<span className="absolute top-0 left-0 px-4 text-sm flex h-full peer-focus:">Email</span>
			</label>
		</div>
	);
};

export default Input;
