# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 11. Homework - Security in container and cloud environments

### Laboratory work

#### Dockerfile Security Analysis in GitLab CI/CD

The goal of this lab is to get familiar with the process of automated Dockerfile inspection in the GitLab CI/CD environment using Hadolint, Trivy, and Dockle, learn to distinguish between types of vulnerabilities, interpret scan results, and form conclusions about secure container development.

#### Input files

You will work with three [files](https://drive.google.com/drive/folders/15Zy5xDsjwNRGEKHX9e6mbvNvBoHb3gd_):

1. **`.gitlab-ci.yml`** — pipeline configuration with three tasks:

- hadolint — Dockerfile linting
- trivy — scanning for configuration errors
- dockle — best practices audit

2. **Dockerbad** — Dockerfile with typical violations:

- using ADD instead of COPY
- running as root
- lack of `--no-install-recommends`
- lack of HEALTHCHECK, etc.

3. **Dockergood** — a fixed, safe Dockerfile that passes all checks.

#### Expected Results

We will use three tools to check the Dockerfile:

- Hadolint, which detects syntax and stylistic errors
- Trivy, which shows configuration risks and vulnerabilities
- Dockle — analyzes the Dockerfile for compliance with best practices

#### Comparison of Dockerfile analysis tools

| Tool     | Purpose                            | Types of risks it detects                                                                                                          | What it helps with                                                                                                 |
| -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Hadolint | Dockerfile linter                  | Stylistic and syntax errors; violations of best practices (ADD vs COPY, missing `--no-install-recommends`, running as root), etc.  | Helps developers write clean, standardized Dockerfile; warns about potential errors even before building the image |
| Trivy    | Security and configuration scanner | Configuration vulnerabilities; missing `USER`, `HEALTHCHECK`; incorrect use of apt; potential paths for privilege escalation, etc. | Provides an in-depth report on configuration security; allows you to assess risks before deployment                |
| Dockle   | Container best practices auditor   | Violation of CIS Docker Benchmark recommendations; redundant files and caches; running as root; lack of `HEALTHCHECK`              | Helps create production-ready images, reduces attack surface, optimizes container size and structure               |

#### Workflow

**Step 1.** Log in to GitLab using the account that was created as part of the lab work for topic 8.
**Step 2.** Create a new project.

To do this, select "New project / repository" from the menu.

**Step 3.** Select "Create a blank project."

**Step 4.** Fill in the missing object field:

- Project name "docker-security".
- In the "Project URL" window, select your user.

**Step 5.** Add files from the archive:

- `.gitlab-ci.yml`
- Docker-bad

**Step 6.** Go to the repository, select Docker-bad and rename it to Dockerfile so that the pipeline can use it.

**Step 7.** Go to the Pipelines section and wait for the check to complete.

**Step 8.** Review the reports from the three tools and determine what security issues they found.

**Step 9.** Replace the Dockerfile with Docker-good and perform the rename as described in step 6.

**Step 10.** Review the reports from the three tools. As you can see, the security issues are gone.

**Step 11.** Compare the reports for Docker-bad and Docker-good and determine which rules were violated.

**Step 12.** Draw conclusions:

- What types of checks does each tool perform?
- How does GitLab respond to violations (e.g., `exit code 1`)?
- What practices are considered secure?

**Step 13.** Consider:

- What violations are critical for security?
- How does the behavior of the pipeline change at different error levels?
- Why is it important to run all three tools?
- How can I create a Dockerfile that is secure and passes the checks?

### Homework
