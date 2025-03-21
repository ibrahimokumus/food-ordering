import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
	try {
		await dbConnect();
		const body = req.body;
		const user = await User.findOne({ email: body.email });
		if (user) {
			res.status(400).json({ message: "user exists" });
			return;
		}
		const newUser = await new User(body);
		//sifteyi  tuzlama (salt) olustur
		const salt = await bcrypt.genSalt(10);
		//hash olustur
		newUser.password = await bcrypt.hash(newUser.password, salt);
		newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);
		await newUser.save();
		res.status(200).json(newUser);
	} catch (err) {
		console.log(err);
	}
};

export default handler;
