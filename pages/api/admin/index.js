import cookie from "cookie";
//!bug include. refactor here later
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

				res.status(200).json({ message: "Başarılı giriş!", token });
			} else {
				res.status(401).json({ message: "Geçersiz kullanıcı bilgileri." });
			}
		} else {
			res.setHeader("Allow", ["POST"]);
			res.status(405).json({ message: "Yalnızca POST isteğine izin verilir." });
		}
	} catch (error) {
		console.error("Hata:", error.message);
		res.status(500).json({ message: "Sunucu hatası." });
	}
};

export default handler;
