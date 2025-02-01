# Tier 2. Module 1: Computer Systems and Their Fundamentals

## Topic 3 - Basics of operating systems
## Homework

### Task

Write a script that automatically checks whether certain websites are available. The script should use the curl command to send HTTP GET requests to each site in the list and check the response.

### Instruction

1. List of websites. Your script should define an array of URLs of the websites to be checked. For example, `https://google.com`, `https://facebook.com`, `https://twitter.com`.
2. Availability check. The script should check each site in the list using `curl`, making sure that the site responds with an HTTP status code of 200, indicating that the site was successfully reached.
3. Recording the results in a file. For each site, the result of the check (available or not available) should be recorded in the log file. The name of the log file must be defined in the script.
4. Output formatting. Results should be clearly worded, for example: `"[<https://google.com>](<https://google.com/>) is UP"` or `"[<https://twitter.com>](< https://twitter.com/>) is DOWN"`.
5. Output of information. After executing the script, a message should be displayed that the results are written to the log file with its name.

### An example of script execution

The script executes the commands and outputs the results to the `website_status.log` file. Entries in the log file will reflect the status of each site (UP or DOWN) at the time the script is run.

`<https://google.com> is UP`
`<https://facebook.com> is UP`
`<https://twitter.com> is UP`

### Acceptance criteria

- The script is written in Bash.
- The script must process redirection correctly.
- Used a loop to go through all the sites in the list.
- Correctly used the `curl` command to check HTTP responses.
- The results of the check are recorded in the log file, a message about this is displayed.
- Code formatting is clear and neat.

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
![Example of the localhost page](./source/image.png)

If everything is configured correctly in the `docker-compose.yaml` file, when you click the `Verify DB` button, you should see the following:
![Updated localhost page](./source/image-1.png)

If instead of "Welcome to FastAPI!" you see a red window with an error message, then you have configured `docker-compose.yaml` incorrectly.

#### Acceptance criteria

- Cloned the repository, created a `Dockerfile` to create a Docker image of the application.
- Wrote `docker-compose.yaml` with configuration for application and PostgreSQL.
- Used Docker Compose, the `docker-compose up` command to build and run the environment.
- The application is functional and the database is available, as confirmed by clicking the `Verify DB` button.
