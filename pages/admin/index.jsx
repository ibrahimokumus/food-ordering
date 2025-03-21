import React from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/form/Input";
import { useFormik } from "formik";
import { adminSchema } from "../../schema/admin";
import Link from "next/link";

const Index = () => {
	const onSubmit = async (values, actions) => {
		console.log("first");
		await new Promise((resolve) => setTimeout(resolve, 4000));
		actions.resetForm();
	};
	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit,
		validationSchema: adminSchema,
	});
	const inputs = [
		{
			id: 0,
			name: "username",
			type: "text",
			placeholder: "Your Username",
			value: values.username,
			errorMessage: errors.username,
			touched: touched.username,
		},
		{
			id: 1,
			name: "password",
			type: "password",
			placeholder: "Your Password ",
			value: values.password,
			errorMessage: errors.password,
			touched: touched.password,
		},
	];
	return (
		<div className="container mx-auto py-3">
			<form className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto" onSubmit={handleSubmit}>
				<Title addClass="text-[40px] mb-6">Admin</Title>
				<div className="flex flex-col gap-y-2 w-full">
					{inputs.map((input) => (
						<Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
					))}
				</div>
				<div className="flex flex-col w-full gap-y-3 mt-6">
					<button className="btn-primary">LOGIN</button>

					<Link href="/home">
						<span className="text-sm underline cursor-pointer text-secondary">Home Page</span>
					</Link>
				</div>
			</form>
		</div>
	);
};
export default Index;
