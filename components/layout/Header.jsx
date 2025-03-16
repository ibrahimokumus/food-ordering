import React, { useState } from "react";
import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
const Header = () => {
	const [isSearchModal, setIsSearchModal] = useState(false);
	const [isMenuModal, setIsMenuModal] = useState(false);

	const router = useRouter();

	return (
		<div className={`h-24 z-50 relative ${router.asPath === "/" ? "bg-transparent" : "bg-secondary"}`}>
			<div className="container mx-auto text-white flex justify-between items-center h-full">
				<div>
					<Logo />
				</div>
				{/* buraya tekrar bak video 14 */}
				<nav
					className={`sm:static absolute top-0 left-0 sm:h-auto sm:w-auto w-full h-screen sm:text-white text-black  sm:bg-transparent bg-white sm:flex hidden ${
						isMenuModal === true && "!grid place-content-center"
					}`}
				>
					<ul className="flex gap-x-2 uppercase sm:flex-row flex-col items-center justify-end">
						<li className="px-1 py-5 hover:text-primary cursor-pointer">
							<Link href="/">Home</Link>
						</li>
						<li className="px-1 py-5 hover:text-primary cursor-pointer">
							<Link href="/menu">Menu</Link>
						</li>
						<li className="px-1 py-5 hover:text-primary cursor-pointer">
							<a href="/about">About</a>
						</li>
						<li className="px-1 py-5 hover:text-primary cursor-pointer">
							<a href="/reservation">Book Table</a>
						</li>
					</ul>
					{isMenuModal && (
						<button
							onClick={() => {
								setIsMenuModal(false);
							}}
							className="absolute top-4 right-4 z-50"
						>
							<GiCancel size={30} className="hover:text-primary" />
						</button>
					)}
				</nav>
				<div className="flex gap-x-4 items-center">
					<Link href="/auth/login">
						<span>
							<FaUserAlt className="hover:text-primary transition-all" />
						</span>
					</Link>
					<Link href="/cart">
						<span>
							<FaShoppingCart className="hover:text-primary transition-all" />
						</span>
					</Link>
					<button onClick={() => setIsSearchModal(true)}>
						<FaSearch className="hover:text-primary transition-all" />
					</button>
					<Link href="#" className="md:inline-block hidden">
						<button className="btn-primary">Order Online</button>
					</Link>
					<button
						onClick={() => {
							setIsMenuModal(true);
						}}
					>
						<GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
					</button>
				</div>
			</div>
			{isSearchModal && <Search onChangeSearchModalVisibility={setIsSearchModal} />}
		</div>
	);
};

export default Header;
