import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [filter, setFilter] = useState([]);
	const [productLimit, setProductLimit] = useState(3);
	useEffect(() => {
		setFilter(productList?.filter((product) => product.category === categoryList[activeIndex]?.title?.toLowerCase()));
		setProductLimit(3);
	}, [categoryList, productList, activeIndex]);

	//console.log(productList);
	return (
		<div className="container mx-auto mb-16">
			<div className="flex flex-col items-center ">
				<Title addClass="text-[40px]"> Our Menu </Title>
				<div className="mt-10">
					{categoryList?.length > 0 &&
						categoryList?.map((category, index) => (
							<button className={`px-6 py-2 rounded-3xl ${index === activeIndex && "bg-secondary text-white"} `} key={category._id} onClick={() => setActiveIndex(index)}>
								{category.title}
							</button>
						))}
				</div>
			</div>

			<div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">{filter?.length > 0 && filter.slice(0, productLimit).map((product) => <MenuItem key={product._id} product={product} />)}</div>

			{filter?.length > 0 && (
				<div className="flex justify-center mt-8">
					<button className="btn-primary" onClick={() => setProductLimit(productLimit + 3)}>
						View more
					</button>
				</div>
			)}
		</div>
	);
};

export default MenuWrapper;
