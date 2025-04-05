# Movie Ticket Booking Backend

This project is one of the most interesting projects I have built so far, as I learned a lot while developing it, especially regarding payment gateways.

## Deployment

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/OfficialSubham/movie-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-backend
   ```

3. Create a `.env` file by copying the contents from `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Install the necessary dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run start
   ```

## Documentation

The codebase is structured to be intuitive. However, for clarity, here are the main routes available in the backend, along with their functionalities and required data:

### Authentication Routes

- **POST `/auth/signup`**: Register a new user.

  - **Request Body**:

    ```json
    {
      "username": "user123",
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```

  - **Response**:

    ```json
    {
      "message": "User registered successfully",
      "userId": "unique_user_id"
    }
    ```

- **POST `/auth/login`**: Authenticate an existing user.

  - **Request Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```

  - **Response**:

    ```json
    {
      "token": "jwt_token",
      "expiresIn": 3600
    }
    ```

### Movie Routes

- **GET `/movies`**: Retrieve a list of all movies.

  - **Response**:

    ```json
    [
      {
        "id": 1,
        "title": "Movie Title",
        "description": "Movie Description",
        "duration": 120
      },
      ...
    ]
    ```

- **GET `/movies/:id`**: Get details of a specific movie by its ID.

  - **Response**:

    ```json
    {
      "id": 1,
      "title": "Movie Title",
      "description": "Movie Description",
      "duration": 120
    }
    ```

### Showtime Routes

- **GET `/showtimes`**: Retrieve all showtimes.

  - **Response**:

    ```json
    [
      {
        "id": 101,
        "movieId": 1,
        "startTime": "2025-04-06T14:00:00Z",
        "availableSeats": 50
      },
      ...
    ]
    ```

- **GET `/showtimes/:id`**: Get details of a specific showtime by its ID.

  - **Response**:

    ```json
    {
      "id": 101,
      "movieId": 1,
      "startTime": "2025-04-06T14:00:00Z",
      "availableSeats": 50
    }
    ```

### Booking Routes

- **POST `/bookings`**: Book tickets for a specific showtime.

  - **Request Body**:

    ```json
    {
      "showtimeId": 101,
      "quantity": 2,
      "paymentToken": "stripe_payment_token"
    }
    ```

  - **Response**:

    ```json
    {
      "message": "Booking successful",
      "bookingId": "unique_booking_id"
    }
    ```

- **GET `/bookings/:id`**: Retrieve details of a specific booking by its ID.

  - **Response**:

    ```json
    {
      "id": "unique_booking_id",
      "userId": "unique_user_id",
      "showtimeId": 101,
      "quantity": 2,
      "status": "confirmed"
    }
    ```

## Notes

- **Environment Variables**: Ensure that the `.env` file contains all the necessary environment variables, such as database connection strings and API keys.

- **Database Migrations**: If you're using Prisma or any ORM, ensure that you run the necessary migrations to set up the database schema.

- **Payment Integration**: For development purposes, use Stripe's test tokens. Sending raw card details directly to the Stripe API is not recommended. Refer to [Stripe's Testing Documentation](https://stripe.com/docs/testing) for more details.

- **Error Handling**: The application includes basic error handling. Ensure that you handle errors gracefully in the frontend and provide meaningful messages to users.

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
