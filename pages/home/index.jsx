import Campaingns from "../../components/Campaingns";
import Carousel from "../../components/Carousel";
import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import About from "../../components/About";
import Reservation from "../../components/Reservation";
import Customers from "../../components/customers/Customers";

const Index = ({ categoryList, productList }) => {
	return (
		<React.Fragment>
			<Carousel />
			<Campaingns />
			<MenuWrapper categoryList={categoryList} productList={productList} />
			<About />
			<Reservation />
			<Customers />
		</React.Fragment>
	);
};

export default Index;
