# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 9. Homework - SCM and change audit

### Laboratory work

#### Auditing a change in a GitLab repository from a security perspective

To better understand the learning logic, let's explain how the connection between the mini-practice and the homework works. These are not two separate tasks, but two stages of one learning process that simulates the real work of a cybersecurity expert.

#### Stage 1: Incident analysis

In real life, when a security incident occurs, the first step is always a technical investigation: establishing the facts, identifying the causes, analyzing the technical details, and documenting the conclusions.

**In the lab work, you develop the skills of:**

- Using the GitLab interface to analyze commits
- Reading the history of changes and assessing their impact
- Authentication checks through commit signatures
- Structured documentation of facts

As a result, you get a full understanding of the technical side of the incident: "The commit in `test_app.py` was unsigned, made directly to main without code review, which led to a violation of the CI/CD process."

#### Stage 2: Strategic Planning (Homework)

At this stage, you move from analysis to strategic thinking. In real work, after an incident investigation, risk modeling, development of preventive measures and optimization of processes always take place.

**In the homework assignment, you:**

- Use all the facts from the mini-practice as a basis for deeper analysis
- Simulate the escalation of scenarios: "What would be the consequences if API keys were compromised instead of `test_app.py`?"
- Develop technical solutions: branch protection rules, mandatory digital signatures, automated security checks
- Formulate an implementation strategy: methods for training the team on security rules without creating a negative atmosphere

**End result:** A comprehensive security improvement plan that includes technical, process and cultural aspects, based on real facts from the mini-practice.

This approach provides a gradual transition from technical skills to strategic thinking that meets the real requirements of a cybersecurity specialist.

#### Initial conditions

- A GitLab repository with a history of changes.
- One commit that modifies the `test_app.py` file.
- An outline of the SCM topic, audit of changes, signatures, reviews.

#### Lab tasks

It is necessary to conduct a full audit of this change, generate a risk report and provide recommendations for improving the SCM process.

Change identification

- Find the commit that modifies `test_app.py`.
- Determine the author, date, commit message.
- Check if the commit has a signature (GPG / SSH).
- Determine whether the change was made in a separate branch or directly to the main one.

Analysis of the content of the change

- View which lines were changed.

Assessing SCM compliance

- Does the commit need to be signed?
- Is there a changelog?

**What to collect for homework**

While completing the lab, keep the following information for your homework report:

- Description of the change: what was changed, by whom, when.
- Violations found: CI failure, unsigned commit, etc.
- Technical facts: was the change in a separate branch, was it code reviewed, is there a signature?
- Screenshots from GitLab (optional, but recommended).

### Homework: Security Risk Analysis in the Change Control Process

Now our goal is to learn how to identify and explain the security risks associated with making changes to the repository without proper control. To develop skills in incident modeling, developing preventive measures and forming a culture of responsibility in the team. To do this, we will use the results of the previous lab work.

#### Initial conditions

- The repository contains a change in `test_app.py`, which led to a CI/CD failure.
- The change was made directly to the main branch, without review, without signature.
- You have completed the lab work and collected technical facts about the change.
- You are familiar with the principles of SSDLC, SCM, change auditing.

#### Technical task

1. Description of the change and technical analysis

Provide a description of the change: what was changed, by whom, when (based on data from the lab work).

- List all detected security policy violations (no review, no signature, no CI lock, etc.).
- For each violation, explain:
  - why it poses a risk;
  - what are the possible consequences;
  - how it violates SSDLC principles.

2. Incident simulation

Describe a realistic scenario in which such a change leads to a security incident (e.g., bypassing authorization checks, token disclosure, breaking authentication logic).

Indicate:

- how exactly the change got into production;
- why it was not detected;
- what are the consequences for users, the business, the team.

3. Development of a preventive strategy

Propose a set of technical and organizational measures that could prevent this incident:

- SCM policies;
- GitLab settings;
- automated checks;
- behavioral practices in the team.

4. Building a Culture of Responsibility

Write a short message to the team (up to 200 words) that explains why change auditing is not a formality, but part of security responsibility.

- Style: constructive, non-accusatory, with an emphasis on a common goal.

The report should be structured, with the following sections:

1. **Introduction**: a brief description of the case.
2. **Technical analysis of the change**: a description of the change from the lab work (what was changed, by whom, when, which lines).
3. **Authentication**: results of the commit signature verification.
4. **Assessment of compliance with SCM policies**: violations identified and their analysis.
5. **Incident modeling**: a realistic scenario of a security incident.
6. **Preventive strategy**: technical and organizational measures.
7. **Building a culture**: a message to the team.
8. **Conclusions**: How this change demonstrates the importance of auditing in SSDLC.

Length: 2-3 pages. Feel free to include examples from the repository, screenshots, and commit links.
