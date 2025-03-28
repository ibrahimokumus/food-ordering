import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
	// Geliştirme modunda global değişken kullanarak HMR'yi koru
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// Production modunda global değişken kullanma
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

// MongoClient bağlantısını dışa aktar
export default clientPromise;
