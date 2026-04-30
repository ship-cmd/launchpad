#This is a Sample Dockerfile and it will not work with the current appliction, fix this file before you deploy.  


FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT 8080
EXPOSE 8080

ENV NAME World

CMD ["python", "app.py"]

