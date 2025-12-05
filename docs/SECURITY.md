# 🔐 Security Policy for i\_bhoomi

## 🎯 Purpose

To define clear responsibilities and practices for identifying, reporting, and resolving security issues in the `i_bhoomi` project.

---

## ✅ Supported Versions

| Version | Status        |
| ------- | ------------- |
| v1.2.1  | ✅ Maintained  |
| < v1.2  | ❌ Unsupported |

---

## 🛡️ Security Practices

### ✅ Infrastructure & Application Security

* All environments enforce **HTTPS** and **strict Content Security Policy (CSP)**
* All endpoints protected with **RBAC**, **JWT auth**, and input validation

### 🔍 Security Testing Tools Integrated

* **SAST**: `bandit` for Python, `eslint-security` for JS
* **SCA**: `npm audit`, `pip-audit`, `oss-review-toolkit`
* **SBOM**: Generated per release using CycloneDX
* **Secrets Detection**: via `gitleaks`, `truffleHog`
* **CI/CD Security Enforcement**: Jenkinsfile integrates license-check, SBOM generation, and vulnerability scans

---

## 🚨 Severity & Response Times

| Severity     | Example            | Response Time | Fix Time     |
| ------------ | ------------------ | ------------- | ------------ |
| **Critical** | RCE, SQLi          | 24 hours      | 3 days       |
| **High**     | Hardcoded secrets  | 48 hours      | 7 days       |
| **Medium**   | XSS                | 5 days        | Next patch   |
| **Low**      | Deprecated headers | 7 days        | As scheduled |

---

## 📣 Responsible Disclosure

* 📬 Email vulnerabilities to: **[security@ibhoomi.dev](mailto:security@ibhoomi.dev)**
* 🕒 Response SLA: **within 48 hours**
* 🛠️ Resolution SLA: **within 7 days** for criticals, otherwise as per severity
* 🙅 Do not test production or exploit data — coordinate with DevSecOps

---

## 📦 SBOM & Dependency Monitoring

* SBOMs stored in `/docs/sbom/` and updated on each tagged release
* License and CVE compliance auto-checked on each push to `main`

---

## 🤝 Contact

**[security@ibhoomi.dev](mailto:security@ibhoomi.dev)**

*Maintained by the i\_bhoomi DevSecOps team — updated quarterly*
