import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
const handle = async (req, res) => {
	await dbConnect();
	const {
		method,
		query: { id },
	} = req;
	if (method === "GET") {
		try {
			const user = await User.findById(id);

			console.log(users);
			res.status(200).json(user);
		} catch (err) {
			console.log(err);
		}
	}
};

export default handle;
