/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**", // verilen yolun altindaki her sey anlamina gelir
			},
		],
	},
};

export default nextConfig;
