import Lottie from "lottie-react";
import animationData from "../public/404NotFound";
const NotFound = () => {
	return (
		<div className="w-full h-screen overflow-hidden">
			<div className="w-[40vw] h-full mx-auto">
				<Lottie animationData={animationData} loop={true} />
			</div>
		</div>
	);
};

export default NotFound;
