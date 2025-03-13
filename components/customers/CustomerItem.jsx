import Image from "next/image";
import React from "react";

export const CustomerItem = (props) => {
	return (
		<div className="mt-5 mx-4">
			<div className="p-6 bg-secondary text-white rounded-md">
				<p>
					Little Red Riding Hood lived in a wood with her mother. One day Little Red Riding Hood went to visit her granny. She had a
					nice cake in her basket. On her way, Little Red Riding Hood met a wolf.
				</p>
				<div className="flex flex-col mt-4">
					<span className="text-lg font-semibold">Moana Michell</span>
					<span className="text-[15px]">magna aliqua</span>
				</div>
			</div>
			<div
				className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
       flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5 "
			>
				<Image src={props.imgSrc} alt="" layout="fill" objectFit="contain" className="rounded-full" />
			</div>
		</div>
	);
};
