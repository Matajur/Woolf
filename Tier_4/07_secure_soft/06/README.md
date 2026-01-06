# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 6. Homework - SAST / DAST / IAST / RASP

### Laboratory work

> This lab is the first part of a larger block dedicated to practical web application security analysis. You start with the most important thing — testing the OWASP Juice Shop, a specially created vulnerable application that allows you to learn how to safely investigate typical vulnerabilities.

In this stage, you will:

- conduct a **DAST analysis (dynamic)** using OWASP ZAP, simulating the actions of an attacker in a browser,
- run a **SAST analysis (static)** using Semgrep to detect security problems without executing code,
- learn to **compare these two methods** and understand their strengths and weaknesses.

This is not abstract theory — you will get real reports, see typical vulnerabilities (SQL Injection, XSS, Hardcoded secrets, etc.) and be able to independently evaluate what each approach “sees”.

> In real projects, these two types of testing are almost always used together. The lab helps you feel how they work and what classes of problems they deal with.

All the results obtained: saved reports, analysis, comparison table — you will use in **the next homework**. This will allow you to move from technical execution to a more analytical level — understanding when, how and why different approaches are used.

Objective of the task:

- Learn how to run a **DAST scan** of OWASPJuiceShop using OWASPZAP.
- Conduct a **static analysis** of the Juice Shop code using Semgrep.
- Compare the results of both approaches and understand their strengths and weaknesses.

#### Prepare the environment

1. **Clone the Juice Shop repository**

```bash
git clone <https://github.com/juice-shop/juice-shop.git> --depth 1

cd juice-shop
```

Or download the archive from [github.com](https://airlock-on-edge.woolf.university/?url=http%3A%2F%2Fgithub.com%2F&resourceId=c67597b5-e32b-462d-a33b-02b8e94ab2e9&studentId=2644b52d-46da-42de-94db-c7fae0e26753&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc1ZlcmlmaWVkIjp0cnVlLCJvcmciOnsiZ3JvdXBzIjpbXSwiaWQiOiIyODU2YWNkMy1jMWUxLTQyMWMtOTg5ZS1jN2RkYmQzMmIyZjIifSwia2luZCI6Im9hdXRoIiwic2NvcGUiOiIqIiwiaXNzIjoidXJuOldvb2xmVW5pdmVyc2l0eTpzZXJ2ZXIvc2VydmljZS9hY2Nlc3MiLCJpZCI6IjI2NDRiNTJkLTQ2ZGEtNDJkZS05NGRiLWM3ZmFlMGUyNjc1MyIsImlhdCI6MTc2NzUyMzY0MX0.LWZRMxPV3A5YAuxNUAr1EKMPn5Fr5f-obCVRyLLbhZc), then unzip it to a folder for lab work.

![Juice Shop repo](./img/repo.png)

2. **Run Juice Shop in Docker**

1. Open PowerShell, Terminal or CMD.
1. Run the command:

```bash
docker run -d -p 3000:3000 bkimminich/juice-shop
```

3. Or, using the desktop version of Docker, run **bkimminich/juice-shop** with the following parameters: port 3000.
4. To test Juice Shop, open the following in your browser: `http://localhost:3000`

If you see the Juice Shop page, the container has started successfully and you can proceed to the next steps.

#### Part 1: DAST with ZAP

1. Install or run OWASP ZAP (GUI or CLI).
2. Run an autoscan by first entering the URL `http://localhost:3000` and clicking “Attack”:

![ZAP interface](./img/zap.png)

Або через консоль:

```bash
zap-cli quick-scan --self-contained --start-options '-daemon -host 0.0.0.0 -port 8080' http://localhost:3000
```

3. When finished, save the report to the lab folder:

![Automated scan](./img/scan.png)

Or with the command:

```bash
zap-cli report -o zap_results.html -f html
```

4. Analyze and evaluate the critical and high vulnerabilities found.

#### Part 2: SAST with Semgrep in Docker

1. Download the semgrep/semgrep:latest image from Docker Hub
2. Open PowerShell, Terminal, or CMD.
3. Run the command:

```bash
docker run --rm -v "$(pwd)":/src returntocorp/semgrep semgrep --config p/owasp-top-ten /src --json -o results_semgrep.json
```

![Docker run Semgrep](./img/powershell.png)

4. Wait for the check to finish.

![Scan status](./img/status.png)

5. Analyze the report, pay attention to the findings:

- SQL Injection
- Hardcoded JWT Secret
- XSS or unsafe crypto
- Path Traversal
- Etc.

**Why Semgrep is suitable for our work:**

- It supports JavaScript / TypeScript, which is included in the Juice Shop architecture.
- In Juice Shop, it can find critical vulnerabilities SQLi, XSS, hardcoded values, etc.

#### Part 3: Analysis of results and comparison

1. Fill in the table:

| Test type | What vulnerabilities were detected (top 3) | Context value                                                                           | False positives?\* | Comment |
| --------- | ------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------ | ------- |
| SAST      | …                                          | Ability to find hardcoded, XSS, trace data flow…                                        | …                  | …       |
| DAST      | …                                          | Imitation of real user behavior, detection of runtime XSS, insecure headers, API flaws… | …                  | …       |

- In this work, False positives can be considered:

If you find a problem, but you understand that it is intentional (for example, in an educational project), indicate this in the comment.

If Semgrep indicates a problem in a file that is not usually used in production or is not an active part of the backend.

#### Checklist before starting the homework

Before proceeding to the homework, make sure that you have the results of the lab work:

- Report or screenshots from OWASP ZAP

DAST analysis was performed, at least 5 vulnerabilities were found.

- Report or screenshots from Semgrep

SAST analysis was performed, at least 3 vulnerabilities were found.

- Completed table "SAST vs DAST"

Indicate what each method detects, what are the advantages and disadvantages.

- Short conclusion (2–3 sentences)

What is the benefit of SAST? What is DAST?

### Homework
