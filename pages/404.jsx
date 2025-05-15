import dynamic from "next/dynamic";
import animationData from "../public/404NotFound";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const NotFound = () => {
	return (
		<div className="w-full h-[40vw]">
			<div className="w-[40vw] h-full mx-auto">
				<Lottie animationData={animationData} loop={true} />
			</div>
		</div>
	);
};

export default NotFound;
