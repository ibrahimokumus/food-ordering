import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
	const [products, setProducts] = useState([]);
	const handleDelete = async (id) => {
		try {
			if (confirm("Are you sure you want to delete this product?")) {
				const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
				if (res.status === 200) {
					toast.success("Product Deleted!");
					getProducts();
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getProducts = async () => {
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
			setProducts(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);
	return (
		<div className="lg:p-8 flex-1 lg:mt-0 mt-5">
			<Title addClass="text-[40px]">Products</Title>
			<div className="overflow-auto w-full mt-5 max-h-[700px] rounded-md">
				<table className="w-full text-sm text-center text-gray-500 min-w-[1000px] ">
					<thead className="text-xs text-gray-400 uppercase bg-gray-700">
						<tr>
							<th scope="col" className="py-3 px-6 sticky top-0 bg-gray-700 z-10">
								Image
							</th>
							<th scope="col" className="py-3 px-6 sticky top-0 bg-gray-700 z-10">
								Id
							</th>
							<th scope="col" className="py-3 px-6 sticky top-0 bg-gray-700 z-10">
								Title
							</th>
							<th scope="col" className="py-3 px-6 sticky top-0 bg-gray-700 z-10">
								Price
							</th>
							<th scope="col" className="py-3 px-6 sticky top-0 bg-gray-700 z-10">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 &&
							products.map((product) => (
								<tr
									className="transition-all bg-secondary border-gray-700 hover:bg-primary "
									key={product._id}
								>
									<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
										<Image
											src={product?.image}
											alt={product.title}
											width={50}
											height={50}
										/>
									</td>
									<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
										{product._id.substring(0, 5)}...
									</td>
									<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
										{product.title}
									</td>
									<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
										$ {product.prices[0]}
									</td>
									<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
										<button
											className="btn-primary !bg-danger"
											onClick={() =>
												handleDelete(
													product._id
												)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Products;
