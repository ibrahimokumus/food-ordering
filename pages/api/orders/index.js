import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/Order";
const handle = async (req, res) => {
	await dbConnect();
	const { method } = req;
	if (method === "GET") {
		try {
			const orders = await Order.find();

			res.status(200).json(orders);
		} catch (err) {
			console.log(err);
		}
	}

	if (method === "POST") {
		try {
			const newOrder = await Order.create(req.body);
			res.status(201).json(newOrder);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" }); // Hata yanıtı gönder
		}
	}
};

export default handle;
