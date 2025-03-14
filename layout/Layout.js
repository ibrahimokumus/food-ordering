import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};
