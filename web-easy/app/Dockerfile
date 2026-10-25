FROM python:3.11-slim

WORKDIR /app

# Non-root user setup
RUN useradd -m -u 1000 ctfuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R ctfuser:ctfuser /app
USER ctfuser

EXPOSE 5000

CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:5000", "--access-logfile", "-", "--error-logfile", "-", "app:app"]
