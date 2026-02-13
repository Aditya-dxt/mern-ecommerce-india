import dotenv from "dotenv";
dotenv.config();

console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY);

await import("./src/server.js");
