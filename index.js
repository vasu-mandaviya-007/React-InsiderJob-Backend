import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import getConnection from "./utils/getConnection.js";
import clerkWebhooks from "./controllers/webhooks.js";
import connectCloudinary from "./config/cloudinary.js";

import companyRoutes from "./routes/companyRoutes.js";
import JobRoutes from "./routes/JobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(
     cors({
          origin: "*", // Allow all origins for now (we will secure this later)
          credentials: true,
     })
);

app.use(express.json());
app.use(clerkMiddleware());

getConnection();
await connectCloudinary();

app.get("/", (req, res) => {
     res.send("Backend Working");
});

app.post("/webhooks", clerkWebhooks);

app.use("/api/company", companyRoutes);

app.use("/api/job", JobRoutes);

app.use("/api/users/", userRoutes);

app.listen(PORT, () => {
     console.log("listening on port " + PORT);
});
