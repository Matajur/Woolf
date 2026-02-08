# Dockerfile
# Use the official Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt from the root directory
# and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code to the working directory
# Use COPY . . to copy the entire current directory
# This accounts for test_app.py and app.py files being in the root
COPY . .

# Define the environment variable for Flask
ENV FLASK_APP=app.py

# Expose port 5000
EXPOSE 5000

# Run the application
CMD ["flask", "run", "--host=0.0.0.0"]
