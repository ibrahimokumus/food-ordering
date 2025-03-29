import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 60,
		},
	},
	{ timestamps: true } //olusturulma zamanlarini veritabanina ekler
);
export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
