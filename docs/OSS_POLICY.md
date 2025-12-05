# 📘 Open Source Software (OSS) Policy for i\_bhoomi

## 🎯 Objective

Ensure secure, compliant, and responsible use of open source components in the `i_bhoomi` project.

---

## 📥 OSS Usage Guidelines

* ✅ Prefer OSS components that are actively maintained
* ✅ Use components only with approved licenses (MIT, Apache 2.0, BSD)
* ❌ Avoid viral licenses (e.g., GPLv3, AGPL) unless explicitly approved
* ✅ Document all third-party libraries

---

## 📄 Licensing Requirements

* Every third-party dependency must have a clear SPDX-compliant license
* Use **SPDX identifiers** in SBOM or LICENSE metadata
* Auto-checks via `license-checker` or `oss-review-toolkit`

---

## 🔐 Security Requirements

* **All OSS must be scanned** using:

  * Language-specific tools (`npm audit`, `pip-audit`, `cargo audit`)
  * Universal tools (`OWASP Dependency-Check`, `Trivy`)

* **SBOMs** must:

  * Use **CycloneDX** or **SPDX** format.
  * Be stored in `/docs/sbom/` and updated **per release**.

* Integrate security into CI/CD using:

  * `license-checker` plugin (Jenkins)
  * `cyclonedx-bom` for Node.js
  * `safety` or `pip-audit` for Python dependencies

---

## 🚫 Blocklist / Denylist

We explicitly block the following OSS tools or libraries:

* ❌ **duck** – Non-compliant licensing and known CVEs
* ❌ Any unlicensed or source-ambiguous packages

---

## ⚠️ Violation Consequences

* 🚫 Usage of non-compliant OSS may lead to rejection of merge/pull requests.
* 🔒 Security gate failures will block CI/CD deployments until resolved.
* 📢 Repeated violations may trigger internal audits and review by the DevSecOps team.

---

## ✅ Approval Workflow

1. Submit an OSS request (via issue template or email)
2. Review by the AppSec or DevSecOps lead
3. Approved entries are added to `allowed_licenses.txt` or SBOM allowlist

---

## 📌 Record Keeping

* Maintain a record of all OSS used via `oss_software_inventory.json`
* Automatically update via CI tools on every push to `main`

---

## 📨 Contact / Questions

For questions or approvals, contact:
**[oss@ibhoomi.dev](mailto:oss@ibhoomi.dev)**

*Maintained by DevSecOps Team — Updated quarterly*
