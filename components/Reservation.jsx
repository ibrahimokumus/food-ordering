import React from "react";
import Title from "./ui/Title";
import Input from "./form/Input";

const Reservation = () => {

     const inputs =[
          {
               id:0,
               name:"fullName",
               type:"text",
               placeholder:"Your Full Name",

          },
          {
               id:1,
               name:"phoneNumber",
               type:"number",
               placeholder:"Your Phone Number",

          },
          {
               id:2,
               name:"email",
               type:"email",
               placeholder:"Your Email Address",

          }
     ]
	return (
		<div className="container  mx-auto py-12">
			<Title addClass="text-[40px] mb-10">Book A Table</Title>
			<div className="flex justify-between flex-wrap-reverse gap-10">
				<div className="lg:flex-1 w-full">
					<div className="flex flex-col gap-y-3">
                              {inputs.map((input)=>(
                                   <Input key={input.id} {...input} />
                              ))}

						
					
					</div>
					<button className="btn-primary mt-4">BOOK NOW</button>
				</div>

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
