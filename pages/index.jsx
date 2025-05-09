import axios from "axios";
import Home from "./home";

export default function Index({ categoryList, productList }) {
	return <Home categoryList={categoryList} productList={productList} />;
}

export const getServerSideProps = async () => {
	try {
		const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
		const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
		//console.log(categories);
		return {
			props: {
				categoryList: categories?.data ? categories.data : [],
				productList: products?.data ? products.data : [],
			},
		};
	} catch (error) {
		console.log(error);
	}
};
