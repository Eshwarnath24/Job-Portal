import './config/instrument.js'
import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controller/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';

// initialize express
const app = express();

/* =======================
   ORIGINAL CODE (COMMENTED)
   ======================= */

// connect to database
// ❌ DO NOT use top-level await in Vercel serverless
// await connectDB();

/* =======================
   FIXED VERSION (Vercel-safe)
   ======================= */

// ✅ Non-blocking DB connection for serverless

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();


app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

// middleware

app.use('/api/company', companyRoutes);

// Routes
app.get('/', (req, res) => {
    res.send("API is working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// app.post('/webhooks', clerkWebhooks);

/* =======================
   ORIGINAL CODE (COMMENTED)
   ======================= */

// PORT is NOT used in Vercel
// const PORT = process.env.PORT || 5000;

// ❌ Vercel does not allow app.listen()
// app.listen(PORT, () => {
//     console.log("server is listening on port " + PORT);
// });

/* =======================
   CORRECT SERVERLESS END
   ======================= */

Sentry.setupExpressErrorHandler(app);

// ✅ Export app for Vercel
export default app;
