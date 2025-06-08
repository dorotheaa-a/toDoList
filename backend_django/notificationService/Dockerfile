FROM python:alpine3.20

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add --no-cache \
    gcc \
    python3-dev \
    musl-dev

WORKDIR /app

COPY ./src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src /app

CMD ["gunicorn", "--bind", "0.0.0.0:8001", "notifications.wsgi"]
