# FormSwift--Form-Submission-App

Welcome to the FormSwift ! This web application provides a platform for users to submit booking requests for entities requiring reservations and/or enquiries (E.g: Hotel Rooms, AirBnBs, Appointments, Booking sites) 
It includes backend functionality for storing booking information in a MongoDB database and sending email notifications upon each new booking submission. Additionally, it serves a "thank you" HTML page to users 
after successfully submitting a booking request.

## Features

- **Booking Form Submission**: Users can submit booking requests through a form.
- **Backend Data Storage**: Booking information is stored in a MongoDB database.
- **Email Notifications**: Upon each new booking submission, an email notification is sent to the specified address.
- **Response to User**: Users receive a "thank you" HTML page as a confirmation after successfully submitting a booking request.

## Installation

1. Clone the repository:
git@github.com:joelrgeorge/FormSwift---Form-Submission-App.git

2. Navigate to the project directory:
cd FormSwift---Form-Submission-App
 
3. Install dependencies:
npm install


4. Set up environment variables:
- Create a `.env` file in the root directory.
- Define the following variables in the `.env` file:
  ```
  PORT=3005
  MONGODB_URI=<your_mongodb_uri>
  SMTP_HOST=smtpout.secureserver.net
  SMTP_PORT=587
  SMTP_USER=user@domain
  SMTP_PASS=your_smtp_password
  ```

## Usage

1. Start the server:
npm start

2. Access the application in your web browser at `http://localhost:3005`.

3. Submit booking requests through the provided form.

## Running with Docker

This project is designed to run as a Dockerized backend service.

### Build the Docker image
docker build -t formswift .

Run the container
docker run --env-file .env -p 3005:3005 formswift

Once running, the API will be available at:

http://localhost:3005

---

## Running with Docker Compose

Docker Compose can be used to run FormSwift along with MongoDB.

docker-compose up

This will start:

1. FormSwift API

2. MongoDB service

The API will be available at:

http://localhost:3005

---

## API usage example

## Example Usage

A simple HTML form integration:

```html
<form method="POST" action="http://localhost:3005/submit">
  <input name="name" placeholder="Name" />
  <input name="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>

```

---

## Project Notes

FormSwift is intended to be used as a backend integration service and is not a standalone frontend application.

It can be integrated into:
- Static websites

- React / Vue / Angular apps

- CMS platforms such as WordPress

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
