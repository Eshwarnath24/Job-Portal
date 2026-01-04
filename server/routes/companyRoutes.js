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

const router = express.Router();

// Register a company
router.post("/register", upload.single('image'), registerCompany);

// Company login
router.post("/login", loginCompany);

// Get company data
router.get("/company", getCompanyData);

// post a job
router.post("/post-job", postJob);

// get data from company
router.get("/applicants", getCompanyData);

// get company job list
router.get("/list-jobs", getCompanyPostedJobs);

// change application status
router.get("/change-status", changeApplicantsStatus);

// change applications visiblity
router.get("/change-visibility", changeJobVisiblity);

export default router;
