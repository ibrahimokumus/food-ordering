import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";

const Search = ({ onChangeSearchModalVisibility }) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
			<OutsideClickHandler onOutsideClick={() => onChangeSearchModalVisibility(false)}>
				<div className="w-full h-full grid place-content-center">
					<div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-2xl ">
						<Title addClass="text-[40px] text-center">Search</Title>
						<input type="text" placeholder="Search..." className="border w-full my-10" />
						<div>
							<ul>
								<li className="flex items-center justify-between p-1 hover:bg-primary transition-all">
									<div className="relative flex">
										<Image
											src="/images/f1.png"
											alt=""
											width={48}
											height={48}
										/>
									</div>
									<span>Good Pizza</span>
									<span>$10</span>
								</li>
								<li className="flex items-center justify-between p-1 hover:bg-primary transition-all">
									<div className="relative flex">
										<Image
											src="/images/f1.png"
											alt=""
											width={48}
											height={48}
										/>
									</div>
									<span>Good Pizza</span>
									<span>$10</span>
								</li>
								<li className="flex items-center justify-between p-1 hover:bg-primary transition-all">
									<div className="relative flex">
										<Image
											src="/images/f1.png"
											alt=""
											width={48}
											height={48}
										/>
									</div>
									<span>Good Pizza</span>
									<span>$10</span>
								</li>
							</ul>
							<button
								onClick={() => onChangeSearchModalVisibility(false)}
								className="absolute top-4 right-4"
							>
								<GiCancel size={30} className="hover:text-primary" />
							</button>
						</div>
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default Search;
