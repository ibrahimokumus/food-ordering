import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";
const handle = async (req, res) => {
	await dbConnect();
	const { method } = req;
	if (method === "GET") {
		try {
			const products = await Product.find();

			res.status(200).json(products);
		} catch (err) {
			console.log(err);
		}
	}

	if (method === "POST") {
		try {
			const newProduct = await Product.create(req.body);
			res.status(200).json(newProduct);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" }); // Hata yanıtı gönder
		}
	}
};

export default handle;
