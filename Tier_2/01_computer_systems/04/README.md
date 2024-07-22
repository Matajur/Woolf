# Tier 2. Module 1: Computer Systems and Their Fundamentals

## Topic 4 - Introduction to Docker and containerization
## Homework

### Task

Clone a FastAPI application, configure and run it in a Docker container. Check that the application and database connection are working correctly.

### Instruction

1. Using the `git clone` command, clone the repository at the [link](https://github.com/GoIT-Python-Web/Computer-Systems-hw02). Change to the cloned directory.
2. Create a `Dockerfile` with instructions for creating a Docker image of the application.
3. Write `docker-compose.yaml` with configuration for the application and PostgreSQL.
4. Use Docker Compose to build the environment, `docker-compose up` command to start the environment.

#### Hint:
Make changes to the `SQLALCHEMY_DATABASE_URL` database connection string: it is located in the `\\conf\\db.py` file. Instead of `localhost`, paste the PostgreSQL service name from your `docker-compose.yaml` file.

`SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://postgres:567234@localhost:5432/hw02"`

When you use Docker Compose, each service (container) has its own network, and they usually cannot reach each other using `localhost`. Instead, you should use the service name as the hostname.

5. Check the functionality of the application and the availability of the database.

#### Hint:
After starting the container with the application, the view in the browser should be as follows:

![Example of the localhost page](./images/image.png)

If everything is configured correctly in the `docker-compose.yaml` file, when you click the `Verify DB` button, you should see the following:

![Updated localhost page](./images/image-1.png)

If instead of "Welcome to FastAPI!" you see a red window with an error message, then you have configured `docker-compose.yaml` incorrectly.

#### Acceptance criteria

- Cloned the repository, created a `Dockerfile` to create a Docker image of the application.
- Wrote `docker-compose.yaml` with configuration for application and PostgreSQL.
- Used Docker Compose, the `docker-compose up` command to build and run the environment.
- The application is functional and the database is available, as confirmed by clicking the `Verify DB` button.
