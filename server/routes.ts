import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import express from "express";
import rateLimit from "express-rate-limit";

// Setup directories
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const META_DIR = path.join(process.cwd(), 'meta');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(META_DIR)) fs.mkdirSync(META_DIR);

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB max
  },
  fileFilter: (req, file, cb) => {
    const allowed = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only mp4/webm/ogg video allowed'));
    }
    cb(null, true);
  }
});

// Utility
function mimeExt(mime: string) {
  if (!mime) return '';
  if (mime.includes('mp4')) return '.mp4';
  if (mime.includes('webm')) return '.webm';
  if (mime.includes('ogg')) return '.ogv';
  return '';
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
  });
  app.use('/api/', limiter);

  // Serve uploads
  app.use('/uploads', express.static(UPLOAD_DIR));

  // Upload Demo Route
  app.post('/api/upload-demo', upload.single('video'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No video uploaded' });

      const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
      const ts = Date.now();
      const ext = mimeExt(req.file.mimetype) || path.extname(req.file.originalname) || '.mp4';
      const safeFilename = `${hash}-${ts}${ext}`;
      const outPath = path.join(UPLOAD_DIR, safeFilename);

      fs.writeFileSync(outPath, req.file.buffer);

      const metadata = {
        hash,
        originalName: req.file.originalname,
        filename: safeFilename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        savedPath: `/uploads/${safeFilename}`,
        ts,
        extra: req.body || {}
      };
      fs.writeFileSync(path.join(META_DIR, `${hash}-${ts}.json`), JSON.stringify(metadata, null, 2));

      return res.json({
        success: true,
        url: metadata.savedPath,
        hash,
        filename: safeFilename,
        originalName: metadata.originalName,
        ts
      });
    } catch (err: any) {
      console.error('upload error', err);
      return res.status(500).json({ error: err.message || 'Upload failed' });
    }
  });

  // Contact Route
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      
      // Save to DB
      const message = await storage.createContactMessage(input);

      // Send Email if configured
      const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
      const smtpHost = process.env.SMTP_HOST;
      
      if (smtpHost && notifyEmail) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const mailOptions = {
          from: `"Digi-Cop Website" <${process.env.SMTP_USER}>`,
          to: notifyEmail,
          subject: `New contact form submission: ${input.name}`,
          text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\nMessage:\n${input.message}\n\nID: ${message.id}`
        };

        transporter.sendMail(mailOptions).catch(e => console.error('mail error', e));
      }

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
