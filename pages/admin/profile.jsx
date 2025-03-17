import { useState } from "react";
import Image from "next/image";

import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import Category from "../../components/admin/Category";
import Footer from "../../components/admin/Footer";

const Profile = () => {
	const [tabs, setTabs] = useState(0);
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
						onClick={() => setTabs(4)}
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
		</div>
	);
};

export default Profile;
