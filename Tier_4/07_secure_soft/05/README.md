# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 5. Homework - Practical cryptography in development

### Laboratory work

In this lab, you will have the opportunity to analyze examples of server configurations that implement JWT, encryption, and password storage, and identify errors in them.

This will simulate the real task of checking someone else's code or configuration for security (code review / security audit) and will give you the opportunity to try to create code that will implement cryptography mechanisms yourself in practice.

#### Objectives

- To get acquainted with typical elements of cryptographic server configuration;
- To learn to detect errors associated with the use of outdated or unsafe algorithms;
- To form an idea of ​​what a modern secure crypto configuration should be.

#### Input

You are given three text configuration [files](https://airlock-on-edge.woolf.university/?url=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1RJC8gUtXpFc0EEYNyVtBp2MIdVmdY9TY%3Fusp%3Dsharing&resourceId=ae487fb0-f1ef-44da-ba73-f2948c3e91b7&studentId=2644b52d-46da-42de-94db-c7fae0e26753&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc1ZlcmlmaWVkIjp0cnVlLCJvcmciOnsiZ3JvdXBzIjpbXSwiaWQiOiIyODU2YWNkMy1jMWUxLTQyMWMtOTg5ZS1jN2RkYmQzMmIyZjIifSwia2luZCI6Im9hdXRoIiwic2NvcGUiOiIqIiwiaXNzIjoidXJuOldvb2xmVW5pdmVyc2l0eTpzZXJ2ZXIvc2VydmljZS9hY2Nlc3MiLCJpZCI6IjI2NDRiNTJkLTQ2ZGEtNDJkZS05NGRiLWM3ZmFlMGUyNjc1MyIsImlhdCI6MTc2NzM3NTY1OH0.xBtED8ZSM_-0UlVr9FQvgfC044kNsn8Pf9P_p6BJUfA) in YAML format (named `crypto_config_we.yaml`, `crypto_config_le.yaml`, `crypto_config_mi.yaml`). Each of them contains a typical configuration structure for:

- JWT tokens;
- Secure password storage;
- Data encryption.

#### Workflow

##### Part 1. Error analysis

1. Open each of the three YAML files.
2. Identify at least **3 errors** or unsafe practices in each configuration file.
3. Explain why it is an error and how to fix it.

##### Part 2. Creating a secure configuration

1. Create your own YAML / JSON file containing settings for jwt, encryption and passwords.
2. Use modern, recommended algorithms and practices in each block.
3. Add comments to each item why this solution was chosen.

#### Report form

##### Table 1: Configuration errors

| File | Error | Why it is an error | How to fix |
| ---- | ----- | ------------------ | ---------- |
| -    | -     | -                  | -          |

##### Table 2: Custom configuration

Insert your YAML / JSON files with comments.

> The continuation of this lab is in the homework. In it, you will design crypto protection for your own microservice, using the knowledge gained from configuration analysis, algorithm selection and principles of secure cryptography.

### Homework: Designing cryptographic security for a microservice

#### Goal

Learn how to design crypto protection from scratch, choose protection mechanisms for a specific task in a real service.

#### Task description

Imagine that you are creating a medical records storage service from microservices:

1. Describe the types of **sensitive information** that the service works with;
2. Identify **possible threats** (using STRIDE logic);
3. Select the **necessary cryptographic mechanisms** (from those in the outline):

- Encryption
- Data transmission protection
- Secret hashing
- Message signing
- Key storage method
- Rotation / audit / access control

4. Create a **YAML configuration** of this microservice: what parameters, encryption, checks, keys, etc.
5. Write a short conclusion: **which cryptographic measures are critical** and which are desirable but not required.

#### Report Format

1. **Data to Protect**

Describe what information is sensitive in your service.

Example: user email, passwords, patient IDs, medical diagnoses, treatment history, medical images.

2. **Potential Threats (2–4 examples according to STRIDE)**

Identify potential threats that may be relevant.

Example:

- Spoofing — impersonation of a user or service.
- Tampering — changing data during transmission.
- Repudiation — inability to prove who performed the action.
- Information Disclosure — leakage of sensitive data.

3. **Cryptographic Protection Mechanisms**

Describe which cryptographic mechanisms are used and explain why they are used.

Example:

- Password hashing using Argon2id.
- Encrypting data on disk with AES-256-GCM.
- Secure data transfer via TLS 1.3.
- Sign messages between microservices using HMAC-SHA256.
- Store keys in a hardware module or a special secret store.

4. **YAML configuration with comments** Provide an example of a YAML file with a microservice configuration.

Add comments to each block, explaining the selected parameters.

5. **Formulate a short summary**:

- What cryptographic measures are critical.
- Which are desirable, but not required.
- What mistakes should be avoided in the future.
