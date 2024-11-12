# Email Service

This project is an email sending service, built with **NestJS** for the backend and **React** for the frontend. It uses **Redis** as the queue system to process emails in the background, and **SendGrid** and **Mailgun** as email providers. If an email fails to send, it is placed in a new queue for later verification. The service also supports sending emails with attachments and uses **Amazon S3** for file management.

Additionally, the entire system can be run in a Dockerized environment.

## Technologies

- **Backend**: NestJS
- **Frontend**: React (Coming soon)
- **Queue**: Redis
- **Email Providers**: SendGrid and Mailgun
- **File Storage**: Amazon S3
- **Docker**: To run the entire system in containers.

## Requirements

- **Docker** and **Docker Compose** installed on your local machine.
- **Node.js** (Only required for local development without Docker).
- **SendGrid and Mailgun Access**: For sending emails.
- **AWS Credentials**: For interacting with S3.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/lmontoya-dev/woowup-challenge-backend
cd email-service

```

### 2. Configure the project

### 2.1 Environment variables

Create a `.env` file in the root of the project with the following environment variables:

```
env

PORT=3000
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_QUEUE_DELAY=5000
REDIS_QUEUE_ATTEMPTS=3
REDIS_QUEUE_EMAIL=email_queue
REDIS_QUEUE_WORK_EMAIL=send_email
REDIS_QUEUE_FAIL_EMAIL=fail_email_queue
REDIS_QUEUE_WORK_FAIL_EMAIL=fail_send_email
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
SENDGRID_API_KEY=
SEND_FROM_EMAIL=

```

### 2.2 Dependencies

If you wish to run the project without Docker, install the dependencies:

```bash

npm install

```

### 3. Run with Docker

To run the entire system using Docker and Docker Compose, simply execute the following command:

```bash

docker-compose up --build

```

This command will build and start the containers for **NestJS**, **Redis**, and the **React Frontend**.

### 4. Access the service

- **Backend (API)**: `http://localhost:3000`
- **Frontend**: `http://localhost:3001` (Coming soon)

### 5. Docker Compose

The `docker-compose.yml` file sets up the following services:

- **NestJS**: The backend that handles business logic.
- **Redis**: Used as a queue to manage the processing of emails.
- **React Frontend**: User interface for interacting with the service.


### 6. Sending Emails

The service allows for sending emails with the following features:

- **With attachment**: Files can be uploaded and processed in Amazon S3 before being sent.
- **Email providers**: If SendGrid fails, Mailgun is used as a fallback.

### 7. Email Queue

The system uses **Redis** as a queue for processing emails in the background. If an email fails to send, it is placed into a new queue for retrying later.

### 8. Error Logging

If the email fails to send, the system logs the failure in a log file and in the queue for later verification.


### 9. API Documentation
You can view the full API documentation at the following link: [API Documentation](https://documenter.getpostman.com/view/37414496/2sAY547ePb).

## License

This project is licensed under the **MIT License**