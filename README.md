# Car Tracking Project

This project comprises a client-server setup for car tracking application using Docker Compose.\
**[API README](./car-tracking-api/README.md)** \
**[Client README](./car-tracking-client/README.md)**

## DEMO
![Car Tracking Demo](https://github.com/husseinshaltout/husseinshaltout.github.io/blob/master/portfolio/assets/img/projects/carTracking.gif)

## Prerequisites

- Docker Engine installed on your system
- Docker Compose installed on your system

## Setup and Run

1. Clone the repository containing the project:
    ```bash
    git clone https://github.com/husseinshaltout/Car-Tracking.git
    cd Car-Tracking
    ```

2. Ensure you are in the root directory of the project, where the `docker-compose.yml` file is located.

3. Start the services by running the following command:
    ```bash
    docker-compose up
    ```

4. Access the following components:

    - **Client:** Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the client application.

    - **Server:** The server API is available at [http://localhost:8000](http://localhost:8000).

    - **PostgreSQL:** The PostgreSQL database is running at `localhost:5432`. Use the following credentials:
        - **Username:** root
        - **Password:** toor
        - **Database:** root

    - **pgAdmin Panel:** Access the PostgreSQL pgAdmin panel at [http://localhost:16543](http://localhost:16543) with the following login details:
        - **Email:** placeholder@example.com
        - **Password:** fakepassword123!

5. To stop the services, press `Ctrl + C` in the terminal where `docker-compose up` is running, or run:
    ```bash
    docker-compose down
    ```

## Additional Notes

- The `car-tracking-client` and `car-tracking-api` directories are mounted as volumes to the respective containers. Any changes made within these directories will reflect in the running containers.

- Environment variables for the server and PostgreSQL are sourced from the `.env` files within the `car-tracking-api` directory.
