import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── HTML Entity Escaper (XSS Prevention) ──────────────────────
function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return 'N/A';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── In-Memory Rate Limiter ────────────────────────────────────
// Allows max 5 submissions per IP per 60 minutes.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

// ── Server-Side Input Validation ──────────────────────────────
function validateInput(data: Record<string, unknown>): string | null {
  const { name, email, phone } = data;

  if (!name || String(name).trim().length < 2) return 'Name is required (min 2 characters).';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) return 'A valid email address is required.';
  if (!phone || !/^\+?[\d\s\-().]{7,25}$/.test(String(phone))) return 'A valid phone number is required.';

  // Prevent absurdly long inputs
  const limits: Record<string, number> = {
    name: 100, email: 150, phone: 25,
    companyName: 150, designation: 100,
    location: 150, country: 100,
    qualification: 100, course: 150, message: 2000,
  };
  for (const [field, max] of Object.entries(limits)) {
    if (data[field] && String(data[field]).length > max) {
      return `${field} exceeds maximum allowed length.`;
    }
  }

  return null; // valid
}

// ── POST Handler ──────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // ── Rate Limiting ──
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // ── Parse & Validate ──
    const data = await req.json();
    const validationError = validateInput(data);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const { type, name, email, phone, message, companyName, designation, location, country, qualification, course } = data;

    // ── Enquiry Type ──
    let enquiryType = 'Student Enquiry';
    if (type === 'partner') enquiryType = 'Partner Enquiry';
    if (type === 'university') enquiryType = 'University Enquiry';

    // ── Sanitize All Fields ──
    const s = {
      name:          escapeHtml(name),
      email:         escapeHtml(email),
      phone:         escapeHtml(phone),
      companyName:   escapeHtml(companyName),
      designation:   escapeHtml(designation),
      location:      escapeHtml(location),
      country:       escapeHtml(country),
      qualification: escapeHtml(qualification),
      course:        escapeHtml(course),
      message:       escapeHtml(message),
      enquiryType:   escapeHtml(enquiryType),
    };

    // ── Nodemailer Transporter ──
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── HTML Email (XSS-safe) ──
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #022C45; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New ${s.enquiryType}</h2>
        </div>
        <div style="padding: 24px; background-color: #f9fafb;">
          <p><strong>Name:</strong> ${s.name}</p>
          <p><strong>Email:</strong> ${s.email}</p>
          <p><strong>Phone:</strong> ${s.phone}</p>
          ${companyName   ? `<p><strong>Company/Institution:</strong> ${s.companyName}</p>`      : ''}
          ${designation   ? `<p><strong>Designation:</strong> ${s.designation}</p>`              : ''}
          ${location      ? `<p><strong>Location:</strong> ${s.location}</p>`                    : ''}
          ${country       ? `<p><strong>Preferred Destination:</strong> ${s.country}</p>`        : ''}
          ${qualification ? `<p><strong>Qualification:</strong> ${s.qualification}</p>`          : ''}
          ${course        ? `<p><strong>Preferred Course:</strong> ${s.course}</p>`              : ''}
          <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-left: 4px solid #F16101; border-radius: 4px;">
            <p style="margin: 0; color: #4b5563;"><strong>Message:</strong></p>
            <p style="margin: 8px 0 0 0; color: #111827; white-space: pre-wrap;">${s.message}</p>
          </div>
        </div>
        <div style="background-color: #f3f4f6; padding: 12px 24px; font-size: 11px; color: #9ca3af; text-align: center;">
          Submitted from edificationoverseas.in &nbsp;|&nbsp; IP: ${ip}
        </div>
      </div>
    `;

    // ── Plain Text Fallback ──
    const textContent = `
New ${s.enquiryType}
Name:          ${s.name}
Email:         ${s.email}
Phone:         ${s.phone}
Company:       ${s.companyName}
Designation:   ${s.designation}
Location:      ${s.location}
Destination:   ${s.country}
Qualification: ${s.qualification}
Course:        ${s.course}
Message:       ${s.message}
Submitted IP:  ${ip}
    `.trim();

    // FIXED: Changed domain from .com to .let to pass Hostinger check validations
    // ADDED: replyTo so you can directly reply to the sender's email address
    await transporter.sendMail({
      from: 'enquiry@edificationoverseas.in',
      to: 'info@edificationoverseas.in',
      replyTo: email,
      subject: `New ${s.enquiryType} from ${s.name}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}