import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
const AddProduct = ({ onChangeProductModalVisibility }) => {
	const [file, setFile] = useState();
	const [imageSource, setImageSource] = useState();
	const [isDragging, setIsDragging] = useState(false);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [category, setCategory] = useState("");
	const [prices, setPrices] = useState([]);
	const [extra, setExtra] = useState("");
	const [extraOptions, setExtraOptions] = useState([]);

	const [categories, setCategories] = useState([]);
	const handleOnChange = (event) => {
		const reader = new FileReader();
		reader.onload = function (onLoadEvent) {
			setImageSource(onLoadEvent.target.result);
			setFile(event.target.files[0]);
		};
		reader.readAsDataURL(event.target.files[0]);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
			setImageSource(URL.createObjectURL(file));
		}
		setIsDragging(true);
	};
	const handleUploadImage = async () => {
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "food-ordering");
		try {
			console.log(extraOptions);

			//console.log(file);

			//	const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, data);
			//	const { url } = response.data;
			// if (response?.status !== 200) {
			// 	onChangeProductModalVisibility(false);
			// 	toast.error("Product image has not been uploaded");
			// 	return;
			// }
			const newProduct = {
				image: "image will be added later" || url,
				title,
				description: desc,
				category: category.toLowerCase(),
				prices,
				extraOptions,
			};
			console.log(newProduct);

			const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct);

			if (res.status === 200) {
				onChangeProductModalVisibility(false);
				toast.success("Product has been saved successfully");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleExtra = () => {
		if (extra && extra.text && extra.price) {
			setExtraOptions((prev) => [...prev, extra]);
		}
	};
	const changePrice = (e, index) => {
		if (e.target.value) {
			const currentPrices = prices;
			currentPrices[index] = e.target.value;
			setPrices(currentPrices);
		}
	};
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
				setCategories(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
			<OutsideClickHandler onOutsideClick={() => onChangeProductModalVisibility(false)}>
				<div className="w-full h-full grid place-content-center">
					<div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-2xl ">
						<Title addClass="text-[40px] text-center">Add a New Product</Title>
						<button onClick={() => onChangeProductModalVisibility(false)} className="absolute top-4 right-4">
							<GiCancel size={30} className="hover:text-primary" />
						</button>
						<div
							className={`flex flex-col text-sm mt-4 border-2 border-dashed p-4 rounded-md transition-colors duration-300 ${
								isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
							}`}
							onDrop={handleDrop}
							onDragOver={(e) => {
								e.preventDefault();
								setIsDragging(true);
							}}
							onDragLeave={() => setIsDragging(false)}
						>
							<label className="flex gap-2 items-center cursor-pointer">
								<input
									type="file"
									accept=".jpeg, .jpg, .png"
									onChange={(e) => handleOnChange(e)}
									className="hidden"
								/>
								<button className="btn-primary !bg-blue-600 pointer-events-none">
									Choose an Image
								</button>
								{imageSource && (
									<img
										src={imageSource}
										alt=""
										className="w-12 h-12 rounded-full"
									/>
								)}
							</label>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Title</b>
							<input
								type="text"
								placeholder="Write a title..."
								className="border rounded-md h-8 px-1 outline-none"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Desc</b>
							<textarea
								placeholder="Write a description..."
								className="border rounded-md h-8 p-1 outline-none"
								onChange={(e) => setDesc(e.target.value)}
							/>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Choose Category</b>
							<select
								placeholder="Select a category"
								className="border rounded-md h-8"
								onChange={(e) => setCategory(e.target.value)}
								value={category || ""}
							>
								{categories.length > 0 &&
									categories.map((category) => (
										<option
											value={category.title.toLowerCase()}
											key={category._id}
										>
											{category.title}
										</option>
									))}
							</select>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Prices</b>
							<div className="flex gap-4 w-full md:flex-nowrap flex-wrap">
								<input
									type="number"
									className="border-b-2 p-1 pl-0 text-sm outline-none"
									placeholder="Small"
									onChange={(e) => {
										changePrice(e, 0);
									}}
								/>
								<input
									type="number"
									className="border-b-2  p-1 pl-0 text-sm outline-none"
									placeholder="Medium"
									onChange={(e) => changePrice(e, 1)}
								/>
								<input
									type="number"
									className="border-b-2  p-1 pl-0 text-sm outline-none"
									placeholder="Large"
									onChange={(e) => changePrice(e, 2)}
								/>
							</div>
						</div>
						<div className="flex flex-col text-sm mt-4">
							<b>Extra</b>
							<div className="flex gap-4 w-full md:flex-nowrap flex-wrap">
								<input
									type="text"
									className="border-b-2 p-1 pl-0 text-sm outline-none w-36"
									placeholder="Item"
									name="text"
									onChange={(e) =>
										setExtra({
											...extra,
											[e.target.name]: e.target.value,
										})
									}
									value={extra.text}
								/>
								<input
									type="number"
									className="border-b-2 p-1 pl-0 text-sm outline-none w-36"
									placeholder="price"
									name="price"
									onChange={(e) =>
										setExtra({
											...extra,
											[e.target.name]: Number(
												e.target.value
											),
										})
									}
									value={extra.price}
								/>
								<button className="btn-primary ml-auto" onClick={() => handleExtra()}>
									Add
								</button>
							</div>

							<div className="mt-2 flex flex-wrap gap-2">
								{extraOptions.map((item, index) => (
									<span
										className="inline-block border border-orange-500 text-orange-500 p-1 rounded-xl text-xs cursor-pointer"
										key={index}
										onClick={() => {
											setExtraOptions(
												extraOptions.filter(
													(
														_,
														i
													) =>
														i !==
														index
												)
											);
										}}
									>
										{item.text}
									</span>
								))}
							</div>
						</div>
						<div className="flex justify-end">
							<button className="btn-primary !bg-success ml-auto" onClick={handleUploadImage}>
								Create
							</button>
						</div>
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default AddProduct;
