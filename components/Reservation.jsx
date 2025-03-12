import React from "react";
import Title from "./ui/Title";
import Input from "./form/Input";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";

const Reservation = () => {
	// kayit islemi gerceklestikten sonra, inputlari temizleme
	const onSubmit = async (values, actions) => {
		await new Promise((resolve) => setTimeout(resolve, 4000));
		actions.resetForm();
	};

	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			fullName: "",
			phoneNumber: "",
			email: "",
			persons: "",
			date: "",
		},
		onSubmit,
		validationSchema: reservationSchema,
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
			name: "phoneNumber",
			type: "number",
			placeholder: "Your Phone Number",
			value: values.phoneNumber,
			errorMessage: errors.phoneNumber,
			touched: touched.phoneNumber,
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "Your Email Address",
			value: values.email,
			errorMessage: errors.email,
			touched: touched.email,
		},
		{
			id: 3,
			name: "persons",
			type: "number",
			placeholder: "How Many Persons?",
			value: values.persons,
			errorMessage: errors.persons,
			touched: touched.persons,
		},
		{
			id: 4,
			name: "date",
			type: "datetime-local",
			value: values.date,
			errorMessage: errors.date,
			touched: touched.date,
		},
	];
	return (
		<div className="container  mx-auto py-12">
			<Title addClass="text-[40px] mb-10">Book A Table</Title>
			<div className="flex justify-between flex-wrap-reverse gap-10">
				<form className="lg:flex-1 w-full" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-y-3">
						{inputs.map((input) => (
							<Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
						))}
					</div>
					<button className="btn-primary mt-4" type="submit">
						BOOK NOW
					</button>
				</form>

				<div className="lg:flex-1 !h-[384px] w-full">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25207.005448346994!2d27.851147364702843!3d37.83979616221907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3efd755b60d3%3A0x41fffa88fe14e941!2sForum%20Ayd%C4%B1n!5e0!3m2!1str!2str!4v1741546425968!5m2!1str!2str"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="w-full h-full"
					></iframe>
				</div>
			</div>
		</div>
	);
};
export default Reservation;
