import Image from "next/image";
import React from "react";
import Title from "./ui/Title";
import Slider from "react-slick";
const Carousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3500,
		appendDots: (dots) => (
			<div>
				<ul className="container mx-auto w-full text-start">{dots}</ul>
			</div>
		),
		customPaging: () => <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>,
	};

	return (
		<div className="h-screen w-full -mt-[96px]">
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="relative h-full w-full">
					<Image src="/images/hero-bg.jpg" alt="" fill style={{ objectFit: "cover" }} />
				</div>
			</div>
			<Slider {...settings}>
				{/* Slide 1 */}
				<div>
					<div className="container mx-auto mt-48 text-white top-48 flex flex-col items-start gap-y-10">
						<Title addClass="text-6xl">Fast Food Restaurant</Title>
						<p className="text-sm sm:w-2/5 w-full">Orders can be written on checks, the duplicate of which is given to the kitchen</p>
						<button className="btn-primary">Order Now</button>
					</div>
				</div>

				{/* Slide 2 */}
				<div>
					<div className="container mx-auto mt-48 text-white top-48 flex flex-col items-start gap-y-10">
						<Title addClass="text-6xl">Fresh Ingredients</Title>
						<p className="text-sm sm:w-2/5 w-full">Our ingredients are always fresh to ensure the best quality for our customers.</p>
						<button className="btn-primary">Learn More</button>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default Carousel;
