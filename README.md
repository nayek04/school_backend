# School Management Backend

A comprehensive Node.js/Express.js REST API backend for managing students, teachers, results, and announcements in a school environment. This backend provides CRUD operations for all school-related entities with MongoDB integration and comprehensive test coverage.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Student Management**: Create, read, update, and delete student records
- **Teacher Management**: Full CRUD operations for teacher data
- **Results Management**: Handle student academic results and grades
- **Announcements System**: Manage school-wide announcements
- **Input Validation**: Comprehensive validation for all API endpoints
- **Error Handling**: Robust error handling with meaningful error messages
- **Automated Testing**: Complete test suite with Jest and Supertest
- **MongoDB Integration**: Mongoose ODM for database operations

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest & Supertest
- **Environment**: dotenv for configuration
- **Validation**: Mongoose schema validation & custom ObjectId validation

## Installation

1. **Clone the repository**:
   git@github.com:nayek04/school_backend.git

3. **Install dependencies**:
npm install

4. **Set up environment variables**:
Create a `.env` file in the root directory:
MONGO_URI=mongodb+srv://nayekmalik2004_db_user:password@cluster1.6zutu7s.mongodb.net/collegeDB?retryWrites=true&w=majority&appName=Cluster1
PORT=3000
NODE_ENV=development

5. **Start MongoDB**:
Make sure MongoDB is running on your system.

6. **Run the application**:
Development mode
npm start

Development with nodemon (if installed)
npm run dev

## Configuration

The application uses environment variables for configuration:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Usage

Once the server is running, you can interact with the API using tools like Postman, curl, or any HTTP client.

**Base URL**: `http://localhost:3000`

### Example API Calls

**Create a new student**:
curl -X POST http://localhost:3000/api/students
-H "Content-Type: application/json"
-d '{"name": "John Doe", "age": 16, "grade": "10th"}'

**Get all students**:
curl -X GET http://localhost:3000/api/students

## API Endpoints

### Students API
| Method | Endpoint              | Description           | Body                                    |
|--------|----------------------|-----------------------|-----------------------------------------|
| GET    | `/api/students`      | Get all students      | -                                       |
| POST   | `/api/students`      | Create new student    | `{"name": "string", "age": number, "grade": "string"}` |
| PUT    | `/api/students/:id`  | Update student        | `{"name": "string", "age": number, "grade": "string"}` |
| DELETE | `/api/students/:id`  | Delete student        | -                                       |

### Teachers API
| Method | Endpoint              | Description           | Body                                           |
|--------|----------------------|-----------------------|-----------------------------------------------|
| GET    | `/api/teachers`      | Get all teachers      | -                                             |
| POST   | `/api/teachers`      | Create new teacher    | `{"name": "string", "subject": "string", "age": number}` |
| PUT    | `/api/teachers/:id`  | Update teacher        | `{"name": "string", "subject": "string", "age": number}` |
| DELETE | `/api/teachers/:id`  | Delete teacher        | -                                             |

### Results API
| Method | Endpoint             | Description          | Body                                               |
|--------|---------------------|----------------------|---------------------------------------------------|
| GET    | `/api/results`      | Get all results      | -                                                 |
| POST   | `/api/results`      | Create new result    | `{"studentId": "string", "subject": "string", "marks": number}` |
| PUT    | `/api/results/:id`  | Update result        | `{"studentId": "string", "subject": "string", "marks": number}` |
| DELETE | `/api/results/:id`  | Delete result        | -                                                 |

### Announcements API
| Method | Endpoint                 | Description              | Body                                      |
|--------|--------------------------|--------------------------|------------------------------------------|
| GET    | `/api/announcements`     | Get all announcements    | -                                        |
| POST   | `/api/announcements`     | Create new announcement  | `{"title": "string", "description": "string"}` |
| PUT    | `/api/announcements/:id` | Update announcement      | `{"title": "string", "description": "string"}` |
| DELETE | `/api/announcements/:id` | Delete announcement      | -                                        |

## Testing

The application includes comprehensive automated tests for all API endpoints.

**Run all tests**:
npm test

**Run tests in watch mode**:
npm run test:watch

**Test Coverage**:
- Unit tests for all CRUD operations
- Integration tests for API endpoints
- Error handling validation tests
- ObjectId validation tests

## Project Structure
school-backend/
├── app1/
│ ├── models/
│ │ ├── Student.js
│ │ ├── Teacher.js
│ │ ├── Result.js
│ │ └── Announcement.js
│ ├── routes/
│ │ ├── students.js
│ │ ├── teachers.js
│ │ ├── results.js
│ │ └── announcements.js
│ ├── tests/
│ │ ├── students.test.js
│ │ ├── teachers.test.js
│ │ ├── results.test.js
│ │ └── announcements.test.js
│ └── app.js
├── .env
├── package.json
└── README.md

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or malformed ObjectId
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

All errors return JSON responses with descriptive error messages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Node.js and Express.js**

