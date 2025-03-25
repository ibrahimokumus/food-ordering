import * as cookie from "cookie";

const handler = (req, res) => {
	try {
		const { method } = req;

		if (method === "POST") {
			const { username, password } = req.body;

			if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
				const token = process.env.ADMIN_TOKEN;

				res.setHeader(
					"Set-Cookie",
					cookie.serialize("accessToken", token, {
						maxAge: 60 * 60, // 1 saat
						sameSite: "strict",
						path: "/",
					})
				);

				res.status(200).json({ message: "Başarılı giriş!" });
			} else {
				res.status(401).json({ message: "Geçersiz kullanıcı bilgileri." });
			}
		}

		if (method === "PUT") {
			const token = process.env.ADMIN_TOKEN;

			res.setHeader(
				"Set-Cookie",
				cookie.serialize("accessToken", token, {
					maxAge: -1,
					path: "/",
				})
			);

			res.status(200).json({ message: "Log out successful" });
		}
	} catch (error) {
		console.error("Hata:", error.message);
		res.status(500).json({ message: "Sunucu hatası." });
	}
};

export default handler;
