import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
	const [inputText, setInputText] = useState("");
	const [categories, setCategories] = useState(["pizza"]);

	const handleCreate = async () => {
		try {
			if (inputText === "" || !inputText) return;
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { title: inputText });
			setCategories([...categories, response?.data]);
			setInputText("");
			toast.success("Category is added");
		} catch (error) {
			toast.error("Something happen wrong");
			console.log(error);
		}
	};

	const handleDelete = async (e, id) => {
		e.preventDefault();
		try {
			if (confirm("Are you sure you want to delete this category?")) {
				await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
				setCategories(categories.filter((category) => category._id !== id));
				toast.success("Category is deleted");
			}
		} catch (err) {
			toast.error("Something happen wrong");
			console.log(err);
		}
	};
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
				setCategories(response?.data);
			} catch (error) {
				console.log(error);
			}
		};
		getCategories();
	}, []);
	return (
		<div className="lg:p-8 flex-1 lg:mt-0 mt-5">
			<Title addClass="text-[40px]">Category</Title>
			<div className="mt-5">
				<div className="flex gap-4 flex-1 items-center">
					<Input placeholder="Add a new Category..." onChange={(e) => setInputText(e.target.value)} value={inputText} />
					<button
						className="btn-primary"
						onClick={() => {
							handleCreate();
						}}
					>
						Add
					</button>
				</div>
				<div className="mt-10 max-h-60 overflow-auto">
					{categories.map((category) => (
						<div className="flex justify-between mt-4" key={category._id}>
							{/*Mongodb de id'ler "_id" alan adiyla tutulur*/}
							<b className="text-xl">{category.title}</b>
							<button className="btn-primary !bg-danger" onClick={(e) => handleDelete(e, category._id)}>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Category;
