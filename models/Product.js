import mongoose from "mongoose";

const extraOptionSchema = new mongoose.Schema({
	text: { type: String },
	price: { type: Number },
});

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 60,
		},
		description: {
			type: String,
			required: true,
			maxlength: 300,
		},
		prices: {
			type: [Number],
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		extraOptions: {
			type: [extraOptionSchema],
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
