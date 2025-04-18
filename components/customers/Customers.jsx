import React from "react";
import Title from "../ui/Title";
import { CustomerItem } from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Customers = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3500,
		nextArrow: <NextBtn />,
		prevArrow: <PrevBtn />,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};
	function NextBtn({ onClick }) {
		return (
			<button className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white" onClick={onClick}>
				<IoIosArrowForward />
			</button>
		);
	}
	function PrevBtn({ onClick }) {
		return (
			<button className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2" onClick={onClick}>
				<IoIosArrowBack />
			</button>
		);
	}
	return (
		<div className="container mx-auto my-20">
			<Title addClass="text-[40px] text-center">What Says Our Customer</Title>

			<Slider {...settings}>
				<CustomerItem imgSrc="/images/client1.jpg" />

				<CustomerItem imgSrc="/images/client2.jpg" />
			</Slider>
		</div>
	);
};
export default Customers;
