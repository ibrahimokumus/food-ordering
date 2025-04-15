import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const status = ["Preparing", "On the way", "Delivered"];
	const handleOrderStatus = async (id) => {
		const selectedOrder = orders.find((order) => order._id === id);

		try {
			const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status: selectedOrder.status + 1 });
			setOrders([response.data, ...orders.filter((order) => order._id !== id)]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const getOrder = async () => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
				if (response.status === 200) {
					setOrders(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getOrder();
	}, []);

	return (
		<div className="lg:p-8 flex-1 lg:mt-0 mt-5">
			<Title addClass="text-[40px]">Orders</Title>
			<div className="overflow-x-auto w-full mt-5">
				<table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
					<thead className="text-xs text-gray-400 uppercase bg-gray-700">
						<tr>
							<th scope="col" className="py-3 px-6">
								Product
							</th>
							<th scope="col" className="py-3 px-6">
								Customer
							</th>
							<th scope="col" className="py-3 px-6">
								Total
							</th>
							<th scope="col" className="py-3 px-6">
								Payment
							</th>
							<th scope="col" className="py-3 px-6">
								Status
							</th>
							<th scope="col" className="py-3 px-6">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.length > 0 &&
							orders
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map((order) => (
									<tr
										className="transition-all bg-secondary border-gray-700 hover:bg-primary"
										key={order._id}
									>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
											{order?._id.substring(0, 5)}...
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
											{order?.customer}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
											${order?.total}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
											{order.paymentMethod === 0
												? "Cash"
												: "Cart"}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
											{status[order?.status]}
										</td>
										<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
											<button
												className="btn-primary !bg-success"
												onClick={() =>
													handleOrderStatus(
														order?._id
													)
												}
												disabled={
													order?.status >
													1
												}
											>
												Next Stage
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

export default Order;
