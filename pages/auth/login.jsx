import React from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/form/Input";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import Link from "next/link";

const Login = () => {
	const onSubmit = async (values, actions) => {
		console.log("first");
		await new Promise((resolve) => setTimeout(resolve, 4000));
		actions.resetForm();
	};
	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit,
		validationSchema: loginSchema,
	});
	const inputs = [
		{
			id: 0,
			name: "email",
			type: "email",
			placeholder: "Your Email Address",
			value: values.email,
			errorMessage: errors.email,
			touched: touched.email,
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
		<div className="container mx-auto">
			<form className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto" onSubmit={handleSubmit}>
				<Title addClass="text-[40px] mb-6">Login</Title>
				<div className="flex flex-col gap-y-2 w-full">
					{inputs.map((input) => (
						<Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
					))}
				</div>
				<div className="flex flex-col w-full gap-y-3 mt-6">
					<button className="btn-primary">LOGIN</button>
					<button className="btn-primary !bg-secondary">
						<i className="fa fa-github mr-2 text-lg"></i>
						GITHUB
					</button>
					<Link href="/auth/register">
						<span className="text-sm underline cursor-pointer text-secondary">Do not you have an account?</span>
					</Link>
				</div>
			</form>
		</div>
	);
};
export default Login;
