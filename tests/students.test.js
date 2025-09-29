const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app1');  // Adjust if needed
const Student = require('../models/Student');  // Add this: Import your Student model for cleanup (adjust path, e.g., '../models/Student')

// Optional: Use in-memory MongoDB for isolated, fast tests (install: npm install --save-dev mongodb-memory-server)
// Uncomment if you want to avoid hitting a real DB
// const { MongoMemoryServer } = require('mongodb-memory-server');
// let mongod;

describe('Students API', () => {
  // Add beforeAll to ensure DB connection (your app might handle this, but explicit is safer)
  beforeAll(async () => {
    // Optional in-memory DB setup (uncomment and install dependency)
    // mongod = await MongoMemoryServer.create();
    // const mongoUri = mongod.getUri();
    // await mongoose.connect(mongoUri);

    // If using real DB, connect to test URI (set in .env as MONGO_URI_TEST)
    // await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
    // Or rely on your app's connection (dotenv loads it)
  });

  // Add beforeEach for isolation: Clear DB before each test to prevent interference
  beforeEach(async () => {
    await Student.deleteMany({});  // Clears all students
  });

  // Your original tests (unchanged, but now isolated)
  it('GET /api/students should return all students', async () => {
    const response = await request(app).get('/api/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);  // Optional: Explicitly expect empty if no data
  });

  it('POST /api/students should create a new student', async () => {
    const newStudent = { name: 'John Doe', age: 20, grade: 'A' };
    const response = await request(app)
      .post('/api/students')
      .send(newStudent);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body._id).toBeDefined();  // Add: Ensure _id is returned for downstream tests
  });

  it('PUT /api/students/:id should update a student', async () => {
    // First create a student to update
    const createResponse = await request(app)
      .post('/api/students')
      .send({ name: 'Jane Doe', age: 21, grade: 'B' });
    const studentId = createResponse.body._id;

    const updatedData = { name: 'Jane Smith', age: 22, grade: 'A' };
    const updateResponse = await request(app)
      .put(`/api/students/${studentId}`)
      .send(updatedData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe(updatedData.name);
  });

  it('DELETE /api/students/:id should delete a student', async () => {
    // First create a student to delete
    const createResponse = await request(app)
      .post('/api/students')
      .send({ name: 'Mark Twain', age: 23, grade: 'C' });
    const studentId = createResponse.body._id;

    // Add debug log to inspect ID (check console during test run)
    console.log('Student ID for deletion:', studentId, typeof studentId);

    // Optional: Verify student exists before delete (assumes you have GET /api/students/:id)
    // const getBefore = await request(app).get(`/api/students/${studentId}`);
    // expect(getBefore.status).toBe(200);

    const deleteResponse = await request(app).delete(`/api/students/${studentId}`);
    expect(deleteResponse.status).toBe(204);

    // Optional: Verify deletion (try to GET it, should be 404)
    // const getAfter = await request(app).get(`/api/students/${studentId}`);
    // expect(getAfter.status).toBe(404);
  });
});

// Updated afterAll: Close in-memory DB if used, and mongoose
afterAll(async () => {
  // if (mongod) await mongod.stop();
  await mongoose.connection.close();
});