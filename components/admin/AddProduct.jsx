import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";
const AddProduct = ({ onChangeProductModalVisibility }) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
			<OutsideClickHandler onOutsideClick={() => onChangeProductModalVisibility(false)}>
				<div className="w-full h-full grid place-content-center">
					<div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-2xl ">
						<Title addClass="text-[40px] text-center">Add a New Product</Title>
						<button onClick={() => onChangeProductModalVisibility(false)} className="absolute top-4 right-4">
							<GiCancel size={30} className="hover:text-primary" />
						</button>
						<div className="flex flex-col text-sm mt-4">
							<b>Choose a image</b>
							<input type="file" />
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Title</b>
							<input
								type="text"
								placeholder="Write a title..."
								className="border rounded-md h-8 px-1 outline-none"
							/>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Desc</b>
							<textarea
								placeholder="Write a description..."
								className="border rounded-md h-8 p-1 outline-none"
							/>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Choose Category</b>
							<select placeholder="Select a category" className="border rounded-md h-8">
								<option value="" selected>
									Select a category
								</option>
								<option value="2">dasdsdsd</option>
								<option value="3">daa2sd</option>
								<option value="4">da34e24sd</option>
								<option value="5">das4grd</option>
							</select>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Prices</b>
							<div className="flex gap-4 w-full md:flex-nowrap flex-wrap">
								<input
									type="number"
									className="border-b-2 p-1 pl-0 text-sm outline-none"
									placeholder="Small"
								/>
								<input
									type="number"
									className="border-b-2  p-1 pl-0 text-sm outline-none"
									placeholder="Medium"
								/>
								<input
									type="number"
									className="border-b-2  p-1 pl-0 text-sm outline-none"
									placeholder="Large"
								/>
							</div>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Extra</b>
							<div className="flex gap-4 w-full md:flex-nowrap flex-wrap">
								<input
									type="number"
									className="border-b-2 p-1 pl-0 text-sm outline-none w-36"
									placeholder="Item"
								/>
								<input
									type="number"
									className="border-b-2 p-1 pl-0 text-sm outline-none w-36"
									placeholder="price"
								/>
								<button className="btn-primary ml-auto">Add</button>
							</div>

							<div className="mt-2">
								<span className="inline-block border border-orange-500 p-1 rounded-xl text-xs text-orange-500">
									mayonez
								</span>
							</div>
						</div>
						<div className="flex justify-end">
							<button className="btn-primary !bg-success ml-auto">Create</button>
						</div>
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default AddProduct;
