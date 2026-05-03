import Job from "../models/Job.js"

const getClientBaseUrl = () => {
    const fallbackUrl = 'https://job-portal-client-eight-wheat.vercel.app';
    const baseUrl = process.env.CLIENT_SITE_URL || process.env.FRONTEND_URL || fallbackUrl;
    return baseUrl.replace(/\/+$/, '');
}

// get all jobs data
export const getJobs = async (req, res) => {
    try {

        const jobs = await Job.find({visible: true})
        .populate({path: 'companyId', select: '-password'});

        res.json({success: true, jobs});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// get single job data
export const getJobById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const job = await Job.findById(id)
        .populate({
            path: 'companyId',
            select: '-password'
        });

        if (!job) {
            return res.json({success: false, message: 'Job not found'});
        }

        return res.json({success: true, job});

    } catch (error) {
        res.json({success: false, message: error.message});
                
    }
}

// dynamic sitemap for all live/public jobs
export const getJobsSitemap = async (req, res) => {
    try {
        const clientBaseUrl = getClientBaseUrl();

        const jobs = await Job.find({ visible: true })
            .select('_id date')
            .sort({ date: -1 })
            .lean();

        const staticUrls = [
            {
                loc: `${clientBaseUrl}/`,
                changefreq: 'daily',
                priority: '1.0'
            }
        ];

        const dynamicUrls = jobs.map((job) => {
            const postedDate = Number(job.date);
            const lastModIso = Number.isFinite(postedDate)
                ? new Date(postedDate).toISOString()
                : new Date().toISOString();

            return {
                loc: `${clientBaseUrl}/apply-job/${job._id}`,
                lastmod: lastModIso,
                changefreq: 'daily',
                priority: '0.8'
            };
        });

        const allUrls = [...staticUrls, ...dynamicUrls];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls
            .map((url) => `  <url>\n    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`)
            .join('\n')}\n</urlset>`;

        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
        return res.status(200).send(xml);

    } catch (error) {
        return res.status(500).send('Unable to generate sitemap');
    }
}