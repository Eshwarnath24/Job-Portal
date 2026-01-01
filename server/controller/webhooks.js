import { Webhook } from "svix";
import User from "../models/User.js";

// API controller functions to manage clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    // make instance of svix of clerk webhook serect
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verifying Headers
    // `req.body` is a raw Buffer because we used `express.raw` on the route.
    const payload = req.body.toString();

    const evt = whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        // Safely build user data with fallbacks to avoid validation errors
        const userData = {
          _id: data.id,
          email:
            (data.email_addresses &&
              data.email_addresses[0] &&
              data.email_addresses[0].email_address) ||
            "",
          name: ((data.first_name || "") + " " + (data.last_name || "")).trim(),
          image: data.image_url || "",
          resume: "",
        };

        await User.create(userData);
        res.json({ message: "user created" });

        break;
      }

      case "user.updated": {
        const userData = {
          email:
            (data.email_addresses &&
              data.email_addresses[0] &&
              data.email_addresses[0].email_address) ||
            undefined,
          name:
            ((data.first_name || "") + " " + (data.last_name || "")).trim() ||
            undefined,
          image: data.image_url || undefined,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: false,
        });
        res.json({ message: "user data updated" });

        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ message: "user data deleted" });

        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Webhooks error" });
  }
};
