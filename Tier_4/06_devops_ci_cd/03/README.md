# Tier 4. Module 6 - DevOps CI/CD

## Homework for Topic 3 - Linux administration

### Technical task

This task will help you consolidate your knowledge of working with Bash scripts and system administration in Linux. You will create a script that automates the installation of the necessary tools for the work of a DevOps engineer.

#### Task description

Create a Bash script to automatically install **Docker**, **Docker Compose**, **Python**, and **Django**, and also **push it on GitHub** in the lesson-3 branch.

#### Task steps

1. Create a Bash script called `install_dev_tools.sh` that automatically:

- installs Docker,
- installs Docker Compose,
- installs Python (version 3.9 or later),
- installs Django via `pip`.

```
The script should check if the tools are already installed to avoid duplication.
```

2. Make the script executable with the command:

```bash
chmod u+x install_dev_tools.sh
```

3. Change the script's permissions to execute:

```bash
chmod u+x install_dev_tools.sh
```

4. Run the script on your system to make sure all the tools are installed correctly.

```bash
./install_dev_tools.sh
```

5. Push the script in the created `lesson-3` branch of your GitHub repository.

```bash
git checkout -b lesson-3
git add install_dev_tools.sh
git commit -m "Add Bash script for installing Docker, Docker Compose, Python, and Django"
git push origin lesson-3
```

#### Acceptance criteria

1. The script installs Docker, Docker Compose, Python, and Django.
2. The installation is not repeated if the tool is already present on the system.
3. The script is pushed to the `lesson-3` branch of your repository.
4. The script follows Bash syntax rules and works on Ubuntu / Debian.
5. The requirements for code formatting and commits in Git are met.
