import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../util/mongo";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	pages: { signIn: "/auth/login" }, // giris yaptigimiz sayfayi veriyoruz
};

export default NextAuth(authOptions);
