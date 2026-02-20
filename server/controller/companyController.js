import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, pass, password } = req.body;

  const plainPassword = pass || password;

  const imgFile = req.file;

  if (!name || !email || !plainPassword || !imgFile) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(plainPassword, salt);

    const imgUpload = await cloudinary.uploader.upload(
      `data:${imgFile.mimetype};base64,${imgFile.buffer.toString("base64")}`,
    );

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imgUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },

      token: generateToken(company._id),
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  } finally {
  }
};

// Company login
export const loginCompany = async (req, res) => {
  try {
    const { email, pass, password } = req.body || {};
    const plainPassword = pass || password;

    if (!email || !plainPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const company = await Company.findOne({ email });
    if (!company) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      plainPassword,
      company.password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Company login failed", error);
    return res.status(500).json({
      success: false,
      message: "Unable to login at the moment",
    });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Post new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();

    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // add no of applicant applied to given job opp
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, jobsData: error.message });
  }
};

// change job applicant status
export const changeApplicantsStatus = async (req, res) => {};

// change job visiblity
export const changeJobVisiblity = async (req, res) => {
  try {
    const { id } = req.body;

    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
