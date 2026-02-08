# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 7. Homework - SCA and dependency management

### Laboratory work

The purpose of this work: To consolidate skills in working with Software Composition Analysis tools to identify vulnerabilities, analyze dependencies, and assess the license status of npm packages.

#### Input

Choose three npm packages (e.g. express, lodash, axios, jsonwebtoken, event-stream, minimist, ua-parser-js, node-forge, xmldom), preferably not the latest versions.

#### Tasks

1. Perform a preliminary analysis of the package.
2. Build a dependency graph.
3. Identify known vulnerabilities.
4. Assess the security hygiene of the project.
5. Generate an SBOM and scan it.
6. Generate a report with recommendations.

#### Workflow

**Step 1.** Preliminary analysis via Socket.dev

- Go to https://socket.dev
- In the search field, enter the name of the package (e.g. lodash).
- Take a screenshot of the Overview section.
- Draw a conclusion: are there any signs of problems.

**Step 2.** Dependency analysis via deps.dev

- Open https://deps.dev
- Find the same package.
- View the dependency graph and record the number of direct and transitive dependencies.
- Take a screenshot of the graph.

**Step 3.** Security hygiene assessment via OpenSSF Scorecard

- Go to https://securityscorecards.dev/viewer
- Enter the URL of the package repository.
- Record the overall score and key notes.
- Take a screenshot of the results.

**Step 4.** Automatic vulnerability search via OSV-Scanner

1. Install OSV-Scanner.

For Linux-like OS: `go install github.com/google/osv-scanner/cmd/osv-scanner@latest`

2. Install Node.js and npm
3. Verify successful installation with the command: `osv-scanner --version`, `node -v` та `npm -v`
4. Create a folder with the test project and add the dependency with the commands:

```bash
mkdir sca-test
cd sca-test
npm init -y
npm install lodash@4.17.19 # as an example, the package lodash@4.17.19 is specified
```

5. Run the scanner with the command: `osv-scanner --recursive .`
6. Record the found CVEs, their CVSS and publication dates.

**Step 5.** Manually search for CVEs and evaluate EPSS

1. Open [cvedetails.com](hhttps://www.cvedetails.com/).
2. Enter the package name.
3. Determine the EPSS for each CVE via https://www.first.org/epss/ .

**Step 6.** SBOM generation via Syft

1. Install Syft

For Linux, use the command: `curl -sSfL <https://raw.githubusercontent.com/anchore/syft/main/install.sh> | sh -s -- -b /usr/local/bin`, then check for performance: `syft --version`

2. Run: `syft dir:. -o cyclonedx-json > sbom.json`
3. View the contents of `sbom.json`.

**Step 7.** Scanning SBOM via Grype

1. Install Grype.

For Linux: `curl -sSfL <https://raw.githubusercontent.com/anchore/grype/main/install.sh> | sh -s -- -b /usr/local/bin`, then check if it works: `grype --version`

2. Run: `grype sbom:sbom.json`
3. Record the scan results.

#### Report Template

1. General Information (package, version, repository, analysis date)
2. Preliminary Analysis (Socket.dev) — suspicious features, screenshot
3. Dependency Graph (deps.dev) — number of dependencies, screenshot
4. Security Hygiene Scorecard (OpenSSF Scorecard) — overall score, key observations, screenshot
5. Automatic Vulnerability Scan (OSV-Scanner) — CVE table with CVSS and recommendations
6. Manual CVE and EPSS scan — CVE table, CVSS, EPSS, description, impact
7. SBOM — number of components, format, SBOM file in applications
8. SBOM scan results (Grype) — CVE table with recommendations
9. Conclusions and recommendations — critical issues, updates, additional measures

---

### Homework: Comparative analysis of dependencies and vulnerabilities in two npm packages

#### Technical task

1. Package Selection

Choose two npm packages that perform similar functions (e.g. jsonwebtoken vs jose, axios vs node-fetch, uuid vs nanoid).

Don't choose the latest versions, but preferably those with a CVE history.

2. Perform analysis for each package:

- Pre-analysis via [Socket.dev](https://socket.dev/)
- Dependency graph via [deps.dev](https://deps.dev/)
- Security hygiene assessment via [OpenSSF Scorecard](https://securityscorecards.dev/viewer/)
- SBOM generation via Syft
- SBOM scanning via Grype
- Manual CVE search ([cvedetails.com](https://www.cvedetails.com/) or [cve.mitre.org](https://www.cve.org/))
- EPSS score for each CVE (https://www.first.org/epss/)

3. Comparison table

Create a table where you compare the packages according to the following criteria:

| Criteria                          | Package A (...) | Package B (...) |
| --------------------------------- | --------------- | --------------- |
| Number of transitive dependencies |                 |                 |
| Number of CVEs                    |                 |                 |
| Average CVSS                      |                 |                 |
| Highest EPSS                      |                 |                 |
| Hygiene level (Scorecard)         |                 |                 |
| Risk indicators (Socket.dev)      |                 |                 |
| License                           |                 |                 |

4. Conclusions and recommendations

Write a short analytical conclusion (up to 1 page) in which:

- justify which package is safer to use;
- indicate whether the dependency needs to be updated/replaced;
- suggest actions for integration into CI/CD (automatic scanning, blocking policies, etc.).

#### Execution artifacts

- Table in .docx, .xlsx, or .md format
- Conclusions — text file or separate section
- Screenshots
- SBOM files — optional, as an attachment
