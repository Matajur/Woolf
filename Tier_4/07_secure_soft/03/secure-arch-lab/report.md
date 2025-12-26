# Tier 4. Module 7 - Secure Software Development and Integration

## Topic 3. Homework - Secure architectural design in SSDLC / CI-CD

### 🔴 Problem 1

**File:** `main.py`

```python
if data["password"] == "secret":
```

**📈 Explenation:**

Insecure password handling, hardcoded password with no password hashing.

**✏️ Outline section/pattern:**

Vault CSI for storing secrets.

**✅ Correction:**

```python
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
HASHED_PASSWORD = os.getenv("HASHED_PASSWORD")

@app.post("/login")
def login(request: LoginRequest):
    password_valid = pwd_context.verify(request.password, HASHED_PASSWORD)
```

### 🔴 Problem 2

**File:** `main.py`

```python
def get_user(id):
```

**📈 Explenation:**

Missing type annotations and parameter validation, allowing code injections instead of "id".

**✏️ Outline section/pattern:**

Data Typing

**✅ Correction:**

```Python
class User(BaseModel):
    id: UUID
    name: str

@app.get("/user", response_model=User)
def get_user(id: UUID = Query(...)):
    return User(id=id, name="Alice")
```

### 🔴 Problem 3

**File:** `main.py`

```python
return {"id": id, "name": "Alice"}
```

**📈 Explenation:**

FastAPI cannot generate accurate documentation or make validation without typing.

**✏️ Outline section/pattern:**

OpenAPI 3.0 contract

**✅ Correction:**

```Python
class User(BaseModel):
    id: UUID
    name: str

@app.get("/user", response_model=User)
def get_user(id: UUID = Query(...)):
    return User(id=id, name="Alice")
```

### 🔴 Problem 4

**File:** `main.py`

```python
@app.post("/login")
def login(request: Request):
    data = request.json()
```

**📈 Explenation:**

Unsafe parsing, no schema validation, If the request body is missing or malformed, or payload is too large, this will exhaust server resources or raise a runtime error on server instead of a clean validation error.

**✏️ Outline section/pattern:**

Data Typing

**✅ Correction:**

```python
class LoginRequest(BaseModel):
    password: str
    username: str

@app.post("/login")
def login(request: LoginRequest):
    password_valid = pwd_context.verify(request.password, HASHED_PASSWORD)
```

### 🔴 Problem 5

**File:** `main.py`

**📈 Explenation:**

There is no logging, which does not allow to aggregate logs, create alerts, respond to incidents, and check system behavior.

**✏️ Outline section/pattern:**

Logging to stdout + structured

**✅ Correction:**

```python
import structlog

log = structlog.get_logger()

if password_valid:
    log.warning("failed_login", username=request.username)
    return {"status": "ok"}

log.info("successful_login", username=request.username)
return {"status": "fail"}
```

### 🔴 Problem 6

**File:** `Dockerfile`

```Dockerfile
FROM python:3.10

RUN pip install fastapi uvicorn
```

**📈 Explenation:**

Lack requirements.txt, possibility to generate SBOM, version control and the ability to automatically check for exploits in third-party packages, leading to vulnerability to supply chain attacks. Also, a full Python image increases the attack surface compared to a slim image.

**✏️ Outline section/pattern:**

IaC as a single trusted source of configurations

**✅ Correction:**

```Dockerfile
FROM python:3.10-slim

RUN pip install --no-cache-dir -r requirements.txt
```

### 🔴 Problem 7

**File:** `main.tf`

```yaml
cidr_blocks = ["0.0.0.0/0"]
```

**📈 Explenation:**

No traffic limitations, accessible from any host.

**✏️ Outline section/pattern:**

Policy-as-Code using OPA

**✅ Correction:**

```Dockerfile
cidr_blocks = ["10.0.0.0/16"]
```

### 🔴 Problem 8

**File:** `ci.yaml`

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Build container
        run: docker build -t user-api .
```

**📈 Explenation:**

No automated checks of SBOM and Gitleaks during CI/CD.

**✏️ Outline section/pattern:**

Architectural signals

**✅ Correction:**

```yaml
jobs:
  secrets:
    steps:
      - uses: actions/checkout@v3
      - name: Gitleaks scan
        run: gitleaks detect --exit-code 1

  sbom:
    steps:
      - run: syft . -o cyclonedx-json > sbom.json
      - run: trivy sbom sbom.json --exit-code 1

  build:
    runs-on: ubuntu-latest
```

### 🔴 Problem 9

**File:** `deployment.yaml`

**📈 Explenation:**

No security context, by defaul in Kubernetes the container runs as root.

**✏️ Outline section/pattern:**

Principle of least privilege

**✅ Correction:**

```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  runAsNonRoot: true
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: ["ALL"]
```
