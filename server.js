import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://httpbin.org/post'; // Configurable CRM/Email Webhook

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helper functions for leads storage
function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

// ----------------------------------------------------
// REST API ENDPOINTS
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'JESUANS Solar Calculator API', company: 'JESUANS Engineering India Pvt. Ltd.', timestamp: new Date().toISOString() });
});

// 2. Submit Lead & Trigger Webhook (POST /api/leads)
app.post('/api/leads', async (req, res) => {
  try {
    const { name, mobile, email, state, plantKW, saveMonthly, netInvestment, method } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({ error: 'Missing required lead fields (name, mobile, email).' });
    }

    const newLead = {
      id: `LEAD-${Date.now()}`,
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      state: state || 'Tamil Nadu',
      plantKW: plantKW || 0,
      saveMonthly: saveMonthly || 0,
      netInvestment: netInvestment || 0,
      method: method || 'bill',
      createdAt: new Date().toISOString()
    };

    // Save lead locally
    const leads = readLeads();
    leads.unshift(newLead);
    writeLeads(leads);

    console.log(`[JESUANS Lead Captured] ${newLead.name} (${newLead.mobile}) - ${newLead.plantKW} kW system`);

    // Trigger Webhook asynchronously to CRM/Email notification service
    let webhookStatus = 'skipped';
    if (WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'lead_created',
            company: 'JESUANS Engineering India Pvt. Ltd.',
            source: 'JESUANS Solar Calculator',
            lead: newLead
          })
        });
        webhookStatus = webhookResponse.ok ? 'success' : `failed (${webhookResponse.status})`;
      } catch (whErr) {
        console.error('[Webhook Error]', whErr.message);
        webhookStatus = `error: ${whErr.message}`;
      }
    }

    res.status(201).json({
      success: true,
      message: 'JESUANS Lead captured successfully and saved.',
      leadId: newLead.id,
      webhookStatus
    });
  } catch (err) {
    console.error('[POST /api/leads Error]', err);
    res.status(500).json({ error: 'Internal server error processing lead submission.' });
  }
});

// 3. View / Export Leads (GET /api/leads)
app.get('/api/leads', (req, res) => {
  const leads = readLeads();
  res.json({
    company: 'JESUANS Engineering India Pvt. Ltd.',
    totalLeads: leads.length,
    leads
  });
});

// 4. Server-Side Solar Savings Calculation Engine (POST /api/calculate)
app.post('/api/calculate', (req, res) => {
  const { plantKW, tariff = 5.50, genPerKW = 4.48 } = req.body;
  
  if (!plantKW || plantKW <= 0) {
    return res.status(400).json({ error: 'Invalid plant capacity.' });
  }

  const dailyGen = plantKW * genPerKW;
  const monthlyGen = dailyGen * 30;
  const annualGen = dailyGen * 365 * 0.98;
  const lifetimeGen = annualGen * 30 * 0.93;

  const saveMonthly = monthlyGen * tariff;
  const saveAnnual = annualGen * tariff;
  const saveLifetime = saveAnnual * 30;

  res.json({
    company: 'JESUANS Engineering India Pvt. Ltd.',
    plantKW,
    tariff,
    dailyGen: Math.round(dailyGen * 10) / 10,
    monthlyGen: Math.round(monthlyGen),
    annualGen: Math.round(annualGen),
    lifetimeGen: Math.round(lifetimeGen),
    saveMonthly: Math.round(saveMonthly),
    saveAnnual: Math.round(saveAnnual),
    saveLifetime: Math.round(saveLifetime)
  });
});

// Serve static frontend files in production
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`⚡ JESUANS Solar Calculator API Server running on http://localhost:${PORT}`);
});
