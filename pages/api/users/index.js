import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
const handle = async (req, res) => {
	await dbConnect();
	const { method } = req;
	if (method === "GET") {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (err) {
			console.log(err);
		}
	}
	//! tekrar gozden gecir
	if (method === "POST") {
		try {
			const newUser = await User.create(req.body);
			res.status(200).json(newUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" }); // Hata yanıtı gönder
		}
	}
};

export default handle;
