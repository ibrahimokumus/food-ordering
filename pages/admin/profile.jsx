import { useState } from "react";
import Image from "next/image";

import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import Category from "../../components/admin/Category";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AddProduct from "../../components/admin/AddProduct";

const Profile = () => {
	const [tabs, setTabs] = useState(0);
	const [isProductModalVisibility, setIsProductModalVisibility] = useState(false);
	const { push } = useRouter();
	const closeAdminAccount = async () => {
		try {
			if (confirm("Are your sure to log out your account?")) {
				const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
				if (response.status === 200) {
					toast.success("Log out successfull");
					push("/admin"); // admine yonlendir
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex px-10 min-h-[calc(100vh_-_433px)]">
			<div className="w-80">
				<div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
					<Image src="/images/admin.png" alt="" width={100} height={100} className="rounded-full" />
					<b className="text-2xl mt-1">Ibrahim</b>
				</div>
				<ul className="text-center font-semibold">
					<li
						onClick={() => setTabs(0)}
						className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
							tabs === 0 && "bg-primary"
						}`}
					>
						<i className="fa fa-cutlery"></i>
						<button className="ml-1 ">Products</button>
					</li>
					<li
						onClick={() => setTabs(1)}
						className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
							tabs === 1 && "bg-primary"
						}`}
					>
						<i className="fa fa-motorcycle"></i>
						<button className="ml-1">Orders</button>
					</li>
					<li
						onClick={() => setTabs(2)}
						className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
							tabs === 2 && "bg-primary"
						}`}
					>
						<i className="fa fa-ellipsis-h"></i>
						<button className="ml-1">Categories</button>
					</li>
					<li
						onClick={() => setTabs(3)}
						className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
							tabs === 3 && "bg-primary"
						}`}
					>
						<i className="fa fa-window-maximize"></i>
						<button className="ml-1">Footer</button>
					</li>
					<li
						onClick={closeAdminAccount}
						className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
							tabs === 4 && "bg-primary"
						}`}
					>
						<i className="fa fa-sign-out"></i>
						<button className="ml-1">Exit</button>
					</li>
				</ul>
			</div>
			{tabs === 0 && <Products />}
			{tabs === 1 && <Order />}
			{tabs === 2 && <Category />}
			{tabs === 3 && <Footer />}
			{isProductModalVisibility && <AddProduct onChangeProductModalVisibility={setIsProductModalVisibility} />}
			<button className="btn-primary absolute w-12 h-12 !p-0 bottom-14 right-10 text-4xl" onClick={() => setIsProductModalVisibility(true)}>
				+
			</button>
		</div>
	);
};

// token yoksa, direk login yonlendiriyor
export const getServerSideProps = (context) => {
	const myCookie = context.req?.cookies || "";
	if (myCookie.accessToken !== process.env.ADMIN_TOKEN) {
		return {
			redirect: {
				destination: "/admin",
				permanent: false,
			},
		};
	}
	return { props: {} };
};
export default Profile;
