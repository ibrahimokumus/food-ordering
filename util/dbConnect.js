import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("Not found mongodb connection");
}

let cached = global.mongoose;
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

console.log("Connected to MongoDB");

export default dbConnect;
