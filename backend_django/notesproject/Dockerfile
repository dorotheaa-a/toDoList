# notes-project/Dockerfile
FROM python:alpine3.20

# for env varssdasf
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apk update && apk add --no-cache \
    gcc \
    python3-dev \
    musl-dev \
    postgresql-dev  # Required for psycopg2

WORKDIR /app

# Install Python dependencies
COPY ./src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY ./src /app

# entrypoint
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "notes-project.wsgi"]