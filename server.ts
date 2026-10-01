import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const N8N_FORM_URL = 'https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c';

// Setup multer for in-memory file handling (up to 15MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health and n8n connectivity test route
app.get('/api/health', async (_req, res) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const n8nCheck = await fetch(N8N_FORM_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    res.json({
      status: 'healthy',
      n8nEndpointStatus: n8nCheck.status,
      n8nEndpointOk: n8nCheck.ok,
      targetUrl: N8N_FORM_URL,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.json({
      status: 'healthy',
      n8nEndpointStatus: 'unreachable',
      n8nEndpointOk: false,
      error: err.message,
      targetUrl: N8N_FORM_URL,
      timestamp: new Date().toISOString(),
    });
  }
});

// Primary application submission route (proxies to n8n form webhook)
app.post('/api/submit-application', upload.any(), async (req, res) => {
  try {
    const fullName = req.body.fullName || req.body['field-0'];
    const email = req.body.email || req.body['field-1'];
    const college = req.body.college || req.body['field-2'];
    const degree = req.body.degree || req.body['field-3'];
    const branch = req.body.branch || req.body['field-4'];
    const graduationYear = req.body.graduationYear || req.body['field-5'];
    const cgpa = req.body.cgpa || req.body['field-6'];
    const preferredRole = req.body.preferredRole || req.body['field-7'];
    const skills = req.body.skills || req.body['field-8'];

    // Find uploaded file from upload.any()
    const files = req.files as Express.Multer.File[] | undefined;
    const resumeFile = files && files.length > 0 ? files[0] : (req as any).file;

    // Validate required fields
    if (!fullName || !email || !college || !degree || !branch || !graduationYear || !cgpa || !preferredRole || !skills) {
      return res.status(400).json({
        success: false,
        error: 'Missing required profile fields. Please complete all fields before submitting.',
      });
    }

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        error: 'Resume PDF is required. Please upload your resume in .pdf format.',
      });
    }

    // Build standard multipart FormData conforming to n8n form schema:
    // field-0: Full Name
    // field-1: Email
    // field-2: College
    // field-3: Degree
    // field-4: Branch
    // field-5: Graduation Year
    // field-6: CGPA
    // field-7: Preferred Role
    // field-8: Skills
    // field-9: Resume (file)
    const n8nFormData = new FormData();
    n8nFormData.append('field-0', String(fullName).trim());
    n8nFormData.append('field-1', String(email).trim());
    n8nFormData.append('field-2', String(college).trim());
    n8nFormData.append('field-3', String(degree).trim());
    n8nFormData.append('field-4', String(branch).trim());
    n8nFormData.append('field-5', String(graduationYear).trim());
    n8nFormData.append('field-6', String(cgpa).trim());
    n8nFormData.append('field-7', String(preferredRole).trim());
    n8nFormData.append('field-8', String(skills).trim());

    // File buffer to Blob
    const fileBlob = new Blob([new Uint8Array(resumeFile.buffer)], {
      type: resumeFile.mimetype || 'application/pdf',
    });
    n8nFormData.append('field-9', fileBlob, resumeFile.originalname || 'resume.pdf');

    // Send POST request directly to the n8n cloud form endpoint
    const response = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: n8nFormData,
    });

    const responseText = await response.text();

    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // responseText might be plain text or HTML
    }

    if (response.ok || response.status === 200 || responseJson?.status === 200) {
      return res.json({
        success: true,
        message: responseJson?.formSubmittedText || 'Your response has been recorded successfully in the placement system.',
        details: {
          fullName,
          email,
          college,
          degree,
          branch,
          preferredRole,
          fileName: resumeFile.originalname,
          submittedAt: new Date().toISOString(),
          referenceId: `PLM-${Date.now().toString(36).toUpperCase()}`,
        },
      });
    } else {
      console.error('n8n submission failed with status:', response.status, responseText);
      return res.status(response.status).json({
        success: false,
        error: `Submission to n8n returned status ${response.status}`,
        details: responseText.slice(0, 500),
      });
    }
  } catch (error: any) {
    console.error('Submission proxy error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while communicating with the placement pipeline.',
      message: error.message,
    });
  }
});

// Explicit JSON error handler to prevent HTML error responses
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API Error Handler caught:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
