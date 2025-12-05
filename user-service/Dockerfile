# ---- builder ----
FROM python:3.11-slim AS builder
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# install build deps (kept in a single layer)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

# ---- runtime ----FROM python:3.11-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# create non-root user
RUN addgroup --system app && adduser --system --ingroup app app

WORKDIR /app

# copy installed packages
COPY --from=builder /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app /app

# create minimal runtime requirements (no build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 && rm -rf /var/lib/apt/lists/*

# drop privileges
USER app

ENV PORT=8000
EXPOSE 8000

# enable a simple healthcheck (k8s will use readiness/liveness separately)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD curl -f http://localhost:8000/health || exit 1

# use gunicorn as entrypoint in production
CMD ["gunicorn", "ibhoomi_user.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--log-level", "info"]
