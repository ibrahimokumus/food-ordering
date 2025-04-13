import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";

const Index = ({ categoryList, productList }) => {
	return <MenuWrapper categoryList={categoryList} productList={productList} />;
};

export default Index;

export const getServerSideProps = async () => {
	const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
	const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

	return {
		props: {
			categoryList: categories.data ? categories.data : [],
			productList: products.data ? products.data : [],
		},
	};
};
