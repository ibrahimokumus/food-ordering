import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import SyncLoader from "react-spinners/SyncLoader";
const Search = ({ onChangeSearchModalVisibility }) => {
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const [filtered, setFiltered] = useState([]);

	const handleSearch = (e) => {
		const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5);
		setFiltered(filteredProducts);
	};

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
				if (response.status === 200) {
					setProducts(response.data);
					setFiltered(response.data.slice(0, 5));
				}
			} catch (error) {
				console.log(error);
			}
		};

		setTimeout(() => {
			getProducts();
		}, 1000);
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
			<OutsideClickHandler onOutsideClick={() => onChangeSearchModalVisibility(false)}>
				<div className="w-full h-full grid place-content-center">
					<div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-2xl ">
						<Title addClass="text-[40px] text-center">Search</Title>
						<Input type="text" placeholder="Search..." onChange={handleSearch} />
						{products?.length > 0 ? (
							<ul className="mt-4">
								{filtered.slice(0, 5).map((product) => (
									<li
										className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
										key={product?._id}
										onClick={() => {
											router.push(
												`/product/${product?._id}`
											);
											onChangeSearchModalVisibility(
												false
											);
										}}
									>
										<div className="relative flex">
											<Image
												src={product?.image}
												alt={product.title}
												width={48}
												height={48}
											/>
										</div>
										<span>{product.title}</span>
										<span>${product.prices[0]}</span>
									</li>
								))}
							</ul>
						) : (
							<div className="flex justify-center items-center mt-8">
								<SyncLoader />
							</div>
						)}

						<button onClick={() => onChangeSearchModalVisibility(false)} className="absolute top-4 right-4">
							<GiCancel size={30} className="hover:text-primary" />
						</button>
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default Search;
