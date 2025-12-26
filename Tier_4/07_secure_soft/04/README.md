# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 4. Homework - Secure programming and APIs

### Technical Task

#### REST API Juice Shop Vulnerability Analysis

Modern web applications actively use REST APIs for client-server interaction. However, it is the API that often becomes the target of attacks related to authorization violations, data leakage, or privilege escalation. The ability to detect and analyze such vulnerabilities is a necessary competency for a cybersecurity specialist.

The homework you are doing is a continuation of the OWASP Juice Shop laboratory work. After practically identifying such typical vulnerabilities as IDOR, Broken Authorization, SQL Injection, you should summarize the results, classify threats according to STRIDE and CWE, and also suggest realistic protection measures.

The goal of this task is not only to consolidate technical skills, but also to develop systems thinking about API security - from identifying problems to formulating solutions.

#### Task steps

1. Prepare a laboratory report

Fill in the table:

| Endpoint | Method | Token? | Vulnerability | STRIDE | CWE |
| -------- | ------ | ------ | ------------- | ------ | --- |
| -        |        |        |               |        |     |
| -        |        |        |               |        |     |

You can use the example in the lab or repeat the tests again for reference.

2. Analyze each vulnerability:

For each vulnerability identified:

- briefly describe the essence of the problem (1–2 sentences)
- explain why it is dangerous (1–2 sentences)
- suggest 1–2 measures to eliminate it

Example:

**Vulnerability:** IDOR allows you to obtain another user's shopping cart data.

**Danger:** violation of confidentiality and the possibility of accessing other people's orders.

**Solution:** check ownership by token; restrict access via RBAC.

3. STRIDE and CWE: Explain the correspondence

For any two vulnerabilities, explain why they belong to the selected class STRIDE and CWE.

Example:

**Broken AuthZ is STRIDE: Elevation of Privilege**, since a regular user can act as an administrator.

Accordingly, this is a **CWE-285** issue, because there is no check for access rights to the function.

#### Tools that can be used

| Instrument                   | Purpose                   |
| ---------------------------- | ------------------------- |
| Postman                      | Sending API requests      |
| jwt.io                       | JWT verification          |
| Browser                      | Viewing the web interface |
| Notepad / Word / Google Docs | Report preparation        |
