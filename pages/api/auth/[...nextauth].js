import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../util/mongo";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

dbConnect();

const signInUser = async ({ user, password }) => {
	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) {
		throw new Error("Incorrect password!");
	}
	return user;
};

export const authOptions = {
	//adapter: MongoDBAdapter(clientPromise),
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const email = credentials.email;
				const password = credentials.password;
				const user = await User.findOne({ email: email });
				if (!user) {
					throw new Error("You haven't registered yet!");
				} else {
					return signInUser({ user, password });
				}
			},
		}),
	],
	pages: { signIn: "/auth/login" }, // giris yaptigimiz sayfayi veriyoruz
	database: process.env.MONGODB_URI,
	secret: "secret",
};

export default NextAuth(authOptions);
