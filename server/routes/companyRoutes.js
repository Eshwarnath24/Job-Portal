import express from "express";
import {
  changeApplicantsStatus,
  changeJobVisiblity,
  getCompanyData,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controller/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single('image'), registerCompany);

// Company login
router.post("/login", loginCompany);

// Get company data
router.get("/company", protectCompany, getCompanyData);

// post a job
router.post("/post-job", protectCompany, postJob);

// get data from company
router.get("/applicants", protectCompany, getCompanyData);

// get company job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// change application status
router.get("/change-status", protectCompany, changeApplicantsStatus);

// change applications visiblity
router.post("/change-visibility", protectCompany, changeJobVisiblity);

export default router;
