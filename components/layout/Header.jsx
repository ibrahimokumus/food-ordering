import React, { useState } from "react";
import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
const Header = () => {
	const [isSearchModal, setIsSearchModal] = useState(false);
	const [isMenuModal, setIsMenuModal] = useState(false);

	const router = useRouter();

	const cart = useSelector((state) => state.cart); //state management & reading state with useSelector
	return (
		<div className={`h-24 z-50 relative ${router.asPath === "/" ? "bg-transparent " : "bg-secondary fixed"}`}>
			<div className="container mx-auto text-white flex justify-between items-center h-full">
				<div>
					<Logo />
				</div>

				<nav className={`sm:static absolute top-0 left-0 sm:h-auto sm:w-auto w-full h-screen sm:text-white text-black  sm:bg-transparent bg-white sm:flex hidden ${isMenuModal === true && "!grid place-content-center"}`}>
					<ul className="flex gap-x-2 uppercase sm:flex-row flex-col items-center justify-end">
						<li className={`px-1 py-5 hover:text-primary cursor-pointer ${router.asPath === "/" && "text-primary"}`} onClick={() => setIsMenuModal(false)}>
							<Link href="/">Home</Link>
						</li>
						<li className={`px-1 py-5 hover:text-primary cursor-pointer ${router.asPath === "/menu" && "text-primary"}`} onClick={() => setIsMenuModal(false)}>
							<Link href="/menu">Menu</Link>
						</li>
						<li className={`px-1 py-5 hover:text-primary cursor-pointer ${router.asPath === "/about" && "text-primary"}`} onClick={() => setIsMenuModal(false)}>
							<a href="/about">About</a>
						</li>
						<li className={`px-1 py-5 hover:text-primary cursor-pointer ${router.asPath === "/reservation" && "text-primary"}`} onClick={() => setIsMenuModal(false)}>
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
							<FaUserAlt className={`hover:text-primary transition-all ${(router.asPath.includes("profile") || router.asPath.includes("auth")) && "text-primary"}`} />
						</span>
					</Link>
					<Link href="/cart">
						<span className="relative">
							<FaShoppingCart className={`hover:text-primary transition-all cursor-pointer ${router.asPath === "/cart" && "text-primary"}`} />
							<span className="px-1 py-px absolute w-4 h-4 text-xs grid place-content-center rounded-full bg-primary -top-2 -right-3 text-black font-bold">
								{cart.products.length === 0 ? 0 : cart.products.length}
							</span>
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
