import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		customer: {
			type: String,
			required: true,
			maxlength: 80,
		},
		address: {
			type: String,
			required: true,
			maxlength: 250,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			default: 0,
		},
		paymentMethod: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
