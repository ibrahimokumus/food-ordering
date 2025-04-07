import React, { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="container mx-auto mb-16">
			<div className="flex flex-col items-center ">
				<Title addClass="text-[40px]"> Our Menu asdasdas</Title>
				<div className="mt-10">
					{categoryList &&
						categoryList.map((category, index) => (
							<button
								className={`px-6 py-2 rounded-3xl ${
									index === activeIndex && "bg-secondary text-white"
								} `}
								key={category._id}
								onClick={() => setActiveIndex(index)}
							>
								{category.title}
							</button>
						))}
				</div>
			</div>

			<div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
				<MenuItem />
				<MenuItem />
				<MenuItem />
			</div>
		</div>
	);
};

export default MenuWrapper;
