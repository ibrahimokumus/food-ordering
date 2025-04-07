import axios from "axios";
import Home from "./home";
//import styles from "../styles/globals.css";
export default function Index({ categoryList }) {
	return (
		<>
			<Home categoryList={categoryList} />
		</>
	);
}

export const getServerSideProps = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
	return {
		props: {
			categoryList: response.data ? response.data : [],
		},
	};
};
