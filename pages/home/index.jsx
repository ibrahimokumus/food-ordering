import Campaingns from "../../components/Campaingns";
import Carousel from "../../components/Carousel";
import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import About from "../../components/About";
import Reservation from "../../components/Reservation";
import Customers from "../../components/customers/Customers";

const Index = () => {
	return (
		<React.Fragment>
			<Carousel />
			<Campaingns />
			<MenuWrapper />
			<About />
			<Reservation />
			<Customers />
		</React.Fragment>
	);
};

export default Index;
