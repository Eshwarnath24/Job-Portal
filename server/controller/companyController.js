import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import Job from "../models/job.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, pass } = req.body;

  const imgFile = req.file;

  if (!name || !email || !pass || !imgFile) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pass, salt);

    const imgUpload = await cloudinary.uploader.upload(
      `data:${imgFile.mimetype};base64,${imgFile.buffer.toString("base64")}`
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
  const { email, pass } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (bcrypt.compare(pass, company.password)) {
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
    } else {
      res.json({
        success: false,
        message: 'Invalid password'
      });
    }
  } catch (error) {
    res.json({
        success: false,
        message: error.message
      });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {};

// Post new job
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id

    try {
      const newJob = new Job({
        title,
        description,
        location,
        salary,
        companyId,
        date: Date.now(),
        level,
        category
      });

      await newJob.save();

      res.json({success: true, newJob});
    } catch (error) {
      res.json({success: false, message: error.message});
    }
}

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {};

// change job applicant status
export const changeApplicantsStatus = async (req, res) => {};

// change job visiblity
export const changeJobVisiblity = async (req, res) => {};
