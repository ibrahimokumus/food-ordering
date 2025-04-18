import Image from "next/image";
import Title from "../../components/ui/Title";
import { useDispatch, useSelector } from "react-redux";
import { resetProduct } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Cart = ({ userList }) => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const user = userList?.find((user) => user.email === session?.user?.email);
	const router = useRouter();
	const newOrder = {
		customer: user?.fullName,
		address: user?.address ? user?.address : "No Address",
		total: cart.total,
		paymentMethod: 0,
		status: 1,
	};

	const createOrder = async () => {
		try {
			if (session && confirm("Are you sure to create an order?")) {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);
				if (response.status === 201) {
					dispatch(resetProduct());
					toast.success("Order created successfully");
					router.push(`/order/${response.data._id}`);
				} else {
					toast.error("Something  happen wrong");
				}
			} else {
				toast.error("Please login");
			}
		} catch (error) {
			session ? toast.error("Something happen wrong") : toast.error("Please login");
			console.log(error);
		}
	};
	return (
		<div className="min-h-[calc(100vh_-_433px)]">
			<div className="flex justify-between items-center md:flex-row flex-col">
				<div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
					<div className="max-h-96 overflow-auto w-full">
						{cart?.products?.length > 0 ? (
							<table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
								<thead className="text-xs text-gray-400 uppercase bg-gray-700 sticky top-0">
									<tr>
										<th scope="col" className="py-3 px-6">
											PRODUCT
										</th>
										<th scope="col" className="py-3 px-6">
											EXTRAS
										</th>
										<th scope="col" className="py-3 px-6">
											PRICE
										</th>
										<th scope="col" className="py-3 px-6">
											QUANTITY
										</th>
									</tr>
								</thead>
								<tbody>
									{cart.products.map((product) => (
										<tr className="transition-all bg-secondary border-gray-700 hover:bg-primary" key={product.id}>
											<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
												<Image src="/images/f1.png" alt="" width={50} height={50} />
												<span>{product.name}</span>
											</td>
											<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
												{product.extras.length > 0 ? product.extras.map((item, index) => <span key={index}>{item.text},</span>) : "empty"}
											</td>
											<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">${product.price}</td>
											<td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">{product.quantity}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p className="text-center font-semibold">Cart is empty!</p>
						)}
					</div>
				</div>
				<div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center">
					<Title addClass="text-[40px]">CART TOTAL</Title>

					<div className="mt-6">
						<b>Subtotal: </b>${cart.total} <br />
						<b className=" inline-block my-1">Discount: </b>
						$0.00 <br />
						<b>Total: </b>${cart.total}
					</div>

					<div>
						<button className="btn-primary mt-4 md:w-auto w-52" onClick={() => createOrder()}>
							CHECKOUT NOW!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

	return {
		props: {
			userList: response.data ? response.data : [],
		},
	};
};

export default Cart;
