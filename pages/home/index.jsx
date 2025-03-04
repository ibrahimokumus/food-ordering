import Campaingns from "../../components/Campaingns";
import Carousel from "../../components/Carousel";
import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import About from "../../components/About";

const Index = () => {
	return (
		<div className="">
			<Carousel />
			<Campaingns />
			<MenuWrapper />
			<About />
		</div>
	);
};

export default Index;
