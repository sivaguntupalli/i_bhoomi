# 🔐 VAPT Report – i_bhoomi Web App

## 📅 Date: 2025-07-23  
## 👤 Conducted By: AppSec Lead – John Doe

---

## 🔍 1. Executive Summary

- **Scope**: Web frontend, backend APIs, and login module.
- **Test Type**: Gray-box
- **Duration**: 3 days (2025-07-20 to 2025-07-22)
- **Critical Findings**: 1 High, 3 Medium, 2 Low

---

## 🎯 2. Objectives
- Identify exploitable vulnerabilities
- Validate authentication and access controls
- Test input validation and API exposure

---

## 📌 3. Scope
| Area                  | In Scope      |
|-----------------------|---------------|
| Web app (https://i_bhoomi.in) | ✅ |
| Admin Dashboard       | ✅             |
| Mobile app            | ❌ (Not tested) |

---

## 🧪 4. Tools Used
- Burp Suite Pro
- OWASP ZAP
- Postman + Custom Scripts
- Nmap (basic scan)

---

## ⚠️ 5. Findings Summary

| ID | Vulnerability             | Risk   | Affected Component | Status   |
|----|---------------------------|--------|---------------------|----------|
| 1  | JWT Token not expiring    | High   | `/auth/token/`      | Open     |
| 2  | No rate limit on login    | Medium | `/auth/token/`      | Fixed    |
| 3  | Missing CSP headers       | Medium | All pages           | In Progress |
| 4  | IDOR on `GET /property/1` | Medium | Property details     | Open     |
| 5  | Email disclosure on 403   | Low    | `/auth/register/`   | Won't Fix |
| 6  | Server version leak       | Low    | Response headers     | Fixed    |

---

## 🔧 6. Remediation Recommendations
- Implement expiry and refresh logic for JWTs
- Add IP/username-based rate limiting to login endpoint
- Apply Content Security Policy headers in frontend
- Add ownership check for property detail API

---

## 📎 7. Attachments
- Burp Suite report (PDF)
- Vulnerability screenshots
- API payload samples

---

## 🧾 8. Retesting Plan
- Retest planned for: **2025-07-28**
- All High/Medium issues must be addressed before release

---

## 📌 9. Notes
- Future test scope to include mobile app
- Recommend continuous DAST (ZAP or StackHawk)
