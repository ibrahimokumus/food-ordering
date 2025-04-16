import dbConnect from "../../../util/dbConnect";
import Footer from "../../../models/Footer";
const handle = async (req, res) => {
	await dbConnect();
	const { method } = req;
	if (method === "GET") {
		try {
			const footers = await Footer.find();

			res.status(200).json(footers);
		} catch (err) {
			console.log(err);
		}
	}

	if (method === "POST") {
		try {
			const newFooter = await Footer.create(req.body);
			res.status(201).json(newFooter);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" }); // Hata yanıtı gönder
		}
	}
};

export default handle;
