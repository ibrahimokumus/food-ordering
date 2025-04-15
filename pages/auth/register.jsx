import React from "react";
import { registerSchema } from "../../schema/register";
import { useFormik } from "formik";
import Title from "../../components/ui/Title";
import Input from "../../components/form/Input";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Register = () => {
	const { push } = useRouter();
	const onSubmit = async (values, actions) => {
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, values);

			if (response.status === 200) {
				toast.success("User created");
				push(`/profile/${response.data._id}`);
			}
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}

		console.log("first");
		await new Promise((resolve) => setTimeout(resolve, 4000));
		actions.resetForm();
	};
	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit,
		validationSchema: registerSchema,
	});
	const inputs = [
		{
			id: 0,
			name: "fullName",
			type: "text",
			placeholder: "Your Full Name",
			value: values.fullName,
			errorMessage: errors.fullName,
			touched: touched.fullName,
		},
		{
			id: 1,
			name: "email",
			type: "email",
			placeholder: "Your Email Address",
			value: values.email,
			errorMessage: errors.email,
			touched: touched.email,
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "Your Password ",
			value: values.password,
			errorMessage: errors.password,
			touched: touched.password,
		},
		{
			id: 3,
			name: "confirmPassword",
			type: "password",
			placeholder: "Your Password Again ",
			value: values.confirmPassword,
			errorMessage: errors.confirmPassword,
			touched: touched.confirmPassword,
		},
	];
	return (
		<div className="container mx-auto">
			<form className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto" onSubmit={handleSubmit}>
				<Title addClass="text-[40px] mb-6">Register</Title>
				<div className="flex flex-col gap-y-2 w-full">
					{inputs.map((input) => (
						<Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
					))}
				</div>
				<div className="flex flex-col w-full gap-y-3 mt-6">
					<button className="btn-primary" type="submit">
						Register
					</button>

					<Link href="/auth/login">
						<span className="text-sm underline cursor-pointer text-secondary">Do you have an account?</span>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;
