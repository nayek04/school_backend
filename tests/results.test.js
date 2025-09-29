const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app1');
const Student = require('../models/student');
const Result = require('../models/Result');

let studentId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // ✅ Create a student with all required fields (including grade)
  const student = await Student.create({
    name: 'Test Student',
    age: 16,
    class: '10A',
    grade: 'A',       // <-- Added this field
    rollNo: '12345'
  });

  studentId = student._id;
});

afterAll(async () => {
  await Student.deleteMany({});
  await Result.deleteMany({});
  await mongoose.connection.close();
});

describe('Results API', () => {
  it('POST /api/results should create a new result', async () => {
    const newResult = {
      studentId,
      subject: 'Math',
      marks: 90
    };

    const response = await request(app)
      .post('/api/results')
      .send(newResult);

    expect(response.status).toBe(201);
    expect(response.body.subject).toBe('Math');
  });

  it('GET /api/results should return all results', async () => {
    const response = await request(app).get('/api/results');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /api/results/:id should update a result', async () => {
    const result = await Result.create({ studentId, subject: 'Science', marks: 75 });

    const updatedData = { marks: 85 };
    const updateResponse = await request(app)
      .put(`/api/results/${result._id}`)
      .send(updatedData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.marks).toBe(85);
  });

  it('DELETE /api/results/:id should delete a result', async () => {
    const result = await Result.create({ studentId, subject: 'English', marks: 70 });

    const deleteResponse = await request(app).delete(`/api/results/${result._id}`);
    expect(deleteResponse.status).toBe(204);
  });
});
