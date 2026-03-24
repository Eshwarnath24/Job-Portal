# 💼 Job Portal

A full-stack **Job Portal** web application built with the **MERN stack** (MongoDB, Express, React, Node.js). It connects job seekers with recruiters, allowing companies to post jobs and candidates to browse and apply — all with a modern, responsive UI.

## 🌐 Live Demo

**Client:** [job-portal-client-eight-wheat.vercel.app](https://job-portal-client-eight-wheat.vercel.app)

---

## ✨ Features

### 👤 Job Seekers
- Browse and search job listings with filters (title, location, category, level)
- View detailed job descriptions with a rich-text editor (Quill)
- Apply to jobs and upload resumes
- Track application status on the **Applied Jobs** page

### 🏢 Recruiters / Companies
- Recruiter login with company authentication
- **Dashboard** to manage hiring workflow
- Post new jobs with detailed descriptions
- Manage existing job listings (change visibility)
- Review applications and update candidate statuses (Accepted / Rejected)

### 🔐 Authentication & Security
- **Clerk** authentication for users (sign-up, sign-in, SSO)
- Separate company/recruiter auth via JWT tokens
- Webhook support for user-sync with Clerk

### 📦 Integrations
- **Cloudinary** — Resume & image uploads
- **MongoDB (Mongoose)** — Database
- **Sentry** — Error tracking & performance monitoring
- **Google Generative AI** — AI-powered features

---

## 🛠️ Tech Stack

| Layer        | Technology                                                   |
| ------------ | ------------------------------------------------------------ |
| **Frontend** | React 19, Vite, Tailwind CSS, React Router, Quill, Lucide Icons |
| **Backend**  | Node.js, Express 5, Mongoose, Clerk, Multer, Zod             |
| **Database** | MongoDB                                                      |
| **Auth**     | Clerk (users) + JWT (recruiters)                             |
| **Storage**  | Cloudinary                                                   |
| **Monitoring** | Sentry                                                     |
| **Deployment** | Vercel (client + server)                                   |

---

## 📁 Project Structure

```
Job-Portal/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Static assets (images, icons)
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobListing.jsx
│   │   │   ├── RecrutierLogin.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AppDownload.jsx
│   │   │   └── Loading.jsx
│   │   ├── context/         # React context (AppContext)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── AppliedJobs.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddJob.jsx
│   │   │   ├── ManageJobs.jsx
│   │   │   └── Applications.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── config/              # DB, Cloudinary & Sentry setup
│   ├── controller/          # Route handlers
│   │   ├── companyController.js
│   │   ├── jobController.js
│   │   ├── userController.js
│   │   └── webhooks.js
│   ├── middleware/           # Auth & other middleware
│   ├── models/              # Mongoose schemas
│   │   ├── Company.js
│   │   ├── Job.js
│   │   ├── JobApplication.js
│   │   └── User.js
│   ├── routes/              # API route definitions
│   │   ├── companyRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── utils/               # Helper utilities
│   ├── server.js            # App entry point
│   └── package.json
│
├── vercel.json              # Vercel deployment config
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Clerk** account → [clerk.com](https://clerk.com)
- **Cloudinary** account → [cloudinary.com](https://cloudinary.com)

### 1. Clone the Repository

```bash
git clone https://github.com/Eshwarnath24/Job-Portal.git
cd Job-Portal
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SENTRY_DSN=your_sentry_dsn
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run server
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

Start the client:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📡 API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/webhooks`           | Clerk webhook handler    |
| GET    | `/api/jobs`           | Fetch all jobs           |
| POST   | `/api/company/*`      | Company auth & management|
| GET    | `/api/users/*`        | User profile & applications |

---

## 🚢 Deployment

Both the **client** and **server** are configured for deployment on **Vercel**.

- The root `vercel.json` routes all requests to `server/server.js`.
- The client has its own `vercel.json` for the frontend build.

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or file an issue.
