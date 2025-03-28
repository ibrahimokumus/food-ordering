import React, { useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/form/Input";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import Link from "next/link";
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
const Login = () => {
	const { data: session } = useSession();
	const { push } = useRouter();
	const [currentUser, setCurrentUser] = useState(null);
	console.log(session);
	const onSubmit = async (values, actions) => {
		const { email, password } = values;
		let options = { redirect: false, email, password };
		try {
			const res = await signIn("credentials", options);
			actions.resetForm();
		} catch (error) {
			console.log(error);
		}

		//	push("/profile");
		//* giris bilgisi yanlissa, hata basilabilir burda.
		//*toastfy ile uyari bas.
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

	useEffect(() => {
		// session varsa, profile yonlendiriyoz
		const getUser = async () => {
			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
				console.log("sonmuc " + res.data?.find((user) => user.email === session?.user?.email));
				setCurrentUser(res.data?.find((user) => user.email === session?.user?.email));
				push("/profile/" + currentUser?._id);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, [session, currentUser]);

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
					<button className="btn-primary" type="submit">
						LOGIN
					</button>
					<button className="btn-primary !bg-secondary" type="button" onClick={() => signIn("github")}>
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
//session varsa direk profile yondirme
export async function getServerSideProbs({ req }) {
	const session = await getSession({ req });
	const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
	const user = res.data?.find((user) => user.email === session?.user.email);
	if (session && user) {
		return {
			redirect: {
				destination: "/profile/" + user._id,
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
export default Login;
