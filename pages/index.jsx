import Input from "../components/form/Input";
import Header from "../components/layout/Header";
import Home from "./home";
//import styles from "../styles/globals.css";
export default function Index() {
	return (
		<div className="">
			<Header />
			<Home />
			<div className="p-20 container mx-auto">
				<Input />
			</div>
		</div>
	);
}
