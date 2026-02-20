import './config/instrument.js'
import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controller/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRouter from './routes/jobRoutes.js';
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// initialize express
const app = express();

/* =======================
   GLOBAL MIDDLEWARE
   ======================= */

app.use(cors());

/* =======================
   CLERK WEBHOOK (RAW BODY)
   IMPORTANT: Must be before express.json()
   ======================= */

app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

app.use(express.json());
app.use(clerkMiddleware())

/* =======================
   DB + CLOUDINARY
   ======================= */

connectDB();
connectCloudinary();

/* =======================
   API ROUTES
   ======================= */

app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRouter);
app.use('/api/users', userRouter);

/* =======================
   TEST ROUTES
   ======================= */

app.get('/', (req, res) => {
  res.send("API is working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

/* =======================
   SENTRY ERROR HANDLER
   ======================= */

Sentry.setupExpressErrorHandler(app);

/* =======================
   LOCAL DEV SERVER
   ======================= */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
}

/* =======================
   VERCEL EXPORT
   ======================= */

export default app;