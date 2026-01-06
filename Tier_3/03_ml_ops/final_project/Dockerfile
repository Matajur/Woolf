FROM python:3.11-slim

# Set environment variables to ensure the app logs to console (which Promtail will capture)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Create non-root user
RUN addgroup --system app && adduser --system --ingroup app app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
# Bake model into the image
COPY model/ ./model/

# Ensure ownership for non-root runtime
RUN chown -R app:app /app

USER app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
