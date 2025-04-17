import React, { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";

import { footerSchema } from "../../schema/footer";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
	const [linkAddress, setLinkAddress] = useState("https://");
	const [iconName, setIconName] = useState("fa fa-");

	const [footer, setFooter] = useState([]);
	const [socialMediaLinks, setSocialMediaLinks] = useState([]);

	const onSubmit = async (values, actions) => {
		try {
			const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/footers/${footer._id}`, {
				location: values?.location,
				phoneNumber: values?.phoneNumber,
				email: values?.email,
				description: values?.desc,
				openingHours: {
					day: values?.day,
					hour: values?.time,
				},
				socialMedia: socialMediaLinks,
			});
			if (response.status === 200) {
				toast.success("Updated successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		enableReinitialize: true,
		initialValues: {
			location: footer?.location,
			phoneNumber: footer?.phoneNumber,
			email: footer?.email,
			desc: footer?.description,
			day: footer.openingHours?.day,
			time: footer.openingHours?.hour,
		},
		onSubmit,
		validationSchema: footerSchema,
	});
	const inputs = [
		{
			id: 0,
			name: "location",
			type: "text",
			placeholder: "Your Location",
			value: values.location,
			errorMessage: errors.location,
			touched: touched.location,
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
			name: "desc",
			type: "text",
			placeholder: "Your Description",
			value: values.desc,
			errorMessage: errors.desc,
			touched: touched.desc,
		},
		{
			id: 4,
			name: "day",
			type: "text",
			placeholder: "Update Day",
			value: values.day,
			errorMessage: errors.day,
			touched: touched.day,
		},
		{
			id: 5,
			name: "time",
			type: "text",
			placeholder: "Update Time",
			value: values.time,
			errorMessage: errors.time,
			touched: touched.time,
		},
	];

	const handleCreate = (e) => {
		setSocialMediaLinks([
			...footer?.socialMedia,
			{
				icon: iconName,
				link: linkAddress,
			},
		]);
		setLinkAddress("https://");
		setIconName("fa fa-");
	};

	useEffect(() => {
		const getFooterData = async () => {
			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footers`);
				setFooter(res.data[0]);
				setSocialMediaLinks(res.data[0].socialMedia);
			} catch (err) {
				console.log(err);
			}
		};
		getFooterData();
	}, []);
	return (
		<form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
			<Title addClass="text-[40px]">Footer Settings</Title>
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
				{inputs.map((input) => (
					<Input key={input.id} {...input} onBlur={handleBlur} onChange={handleChange} />
				))}
			</div>
			<div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
				<div className="flex items-center gap-4">
					<Input placeholder="Link Address" onChange={(e) => setLinkAddress(e.target.value)} value={linkAddress} />
					<Input placeholder="Icon Name" defaulValue="fa fa-" onChange={(e) => setIconName(e.target.value)} value={iconName} />
					<button className="btn-primary" type="button" onClick={handleCreate}>
						Add
					</button>
				</div>
				<ul className="flex items-center gap-6">
					{socialMediaLinks?.map((media, index) => (
						<li key={index} className="flex items-center">
							<i className={`${media.icon} text-2xl`}></i>
							<button
								className="text-danger"
								onClick={() => {
									setSocialMediaLinks((prev) =>
										prev.filter((item, i) => i !== index)
									);
								}}
								type="button"
							>
								<i className="fa fa-trash text-xl ml-2"></i>
							</button>
						</li>
					))}
				</ul>
			</div>
			<button className="btn-primary mt-4" type="submit">
				Update
			</button>
		</form>
	);
};

export default Footer;
