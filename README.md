# Coaching Scheduler
Welcome to Coaching Scheduler, a full-stack website built to manage coaching lesson scheduling. This project enables coaches to efficiently schedule 1-on-1 lessons with students, record lesson details, and manage their availability. It also provides students with an easy way to view available coaching slots and book calls.

## Project Overview
The Coaching Scheduler project is developed using [NestJS](https://nestjs.com/), [Angular](https://angular.io/), and [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/) as ORM. It consists of a backend API and a frontend application. 
The backend API is built with NestJS, providing a robust and scalable server-side solution.
API documentation is available through [Swagger](https://swagger.io/), for easy exploration of the endpoints and their functionalities. 
The frontend is developed using Angular, incorporating [Tailwind CSS](https://tailwindcss.com/) and [Google's Material](https://material.angular.io/) Design components to create a modern and intuitive user interface.

# Features
The Coaching Scheduler satisfies the following user stories:

* Coaches can add slots of availability to their calendars. Each slot is a 2-hour duration and can be booked by one student only.
* Coaches can view their own upcoming schedules to keep track of their appointments.
* Students can view upcoming available times across all coaches' calls, making it convenient for them to find suitable slots.
* Students can book a 2-hour slot for a coaching call with their preferred coach.
* Coaches can then confirm the slots booked by students, marking those slots as scheduled - to occur in a near future.
* Coaches have access to their lesson history, which includes details of each coaching session with every student.
* Coaches can record the student's satisfaction level (an integer from 1 to 5) and add free-form notes after completing a coaching lesson call.
* Coaches can review their past scores and notes for all of their calls, helping them keep track of their interactions with students.
* Coaches can define their areas of expertise, highlighting their most proficient areas of coaching.
* Time slots are carefully managed to avoid overlaps, ensuring that coaches cannot have two lessons scheduled simultaneously.
* Business hours are in between 8:00 AM and 9:30 PM, so the latest start of a lesson call is at 7:30 PM.
  - If you attempt to create an available slot for the current day after 7:30 PM, you will receive a friendly notification in the form of a snackbar indicating that it is outside of business hours.

## Getting Started
To run the Coaching Scheduler project, follow these steps:
* Clone the repository to your local machine.
* Configure postgres database.
* Run backend.
* Run frontend.

### Database

Configure the PostgreSQL connection in the backend's .env file. 
An example file will help you understand which variables are needed to setup the database succesfully - `.env-example` file

Don't forget to name your .env file as `.env` and place it in the backend folder.


### Backend

* Open a terminal and navigate to the `backend` directory.
```
# Install backend dependencies
$ npm install 

# Run development server
$ npm run start
```
* The backend server will be running on port `3100` by default. If needed, you can modify this configuration in the main.ts file located in the backend folder.


### Frontend

* Open another terminal and navigate to the `frontend` directory.
```
# Install frontend dependencies
$ npm install 

# Run development server
$ npm run start
```
* Configure the API endpoint in the frontend's environment file. Currently, it's pointing to port `3100`.
* Access the Coaching Scheduler in your browser at http://localhost:4300.
  * This can be changed under `package.json` file located in the frontend folder. Right now, `npm run start` task maps with `ng serve --port 4300`

### API Documentation
The Coaching Scheduler API is documented using Swagger.
To explore the API and view the available endpoints, you can visit http://localhost:<port>/api in your browser after starting the backend server. 

Since I have the backend port pre-defined as 3100, you would see Swagger running on http://localhost:3100/api
 - This can be changed  under `main.ts` file located in the backend folder.

