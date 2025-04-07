import React from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";

const Index = ({ categoryList }) => {
	return <MenuWrapper categoryList={categoryList} />;
};

export default Index;

export const getServerSideProps = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
	return {
		props: {
			categoryList: response.data ? response.data : [],
		},
	};
};
