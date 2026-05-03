import express from 'express'
import { getJobById, getJobs, getJobsSitemap } from '../controller/jobController.js';

const router = express.Router();

// Route to get all job data
router.get('/', getJobs);

// Dynamic sitemap route for live job URLs
router.get('/sitemap.xml', getJobsSitemap);

// Route to get single job data
router.get('/:id', getJobById);

export default router;