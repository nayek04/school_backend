const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app1');  // Adjust path as needed

describe('Teachers API', () => {
  it('POST /api/teachers should create a new teacher', async () => {
    const newTeacher = { name: 'Rahul', subject: 'Math', age: 32 };
    const response = await request(app)
      .post('/api/teachers')
      .send(newTeacher);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Rahul');
    expect(response.body._id).toBeDefined();
  });

  it('GET /api/teachers should return all teachers', async () => {
    const response = await request(app).get('/api/teachers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /api/teachers/:id should update a teacher', async () => {
    // First create a teacher to update
    const createResponse = await request(app)
      .post('/api/teachers')
      .send({ name: 'Anita', subject: 'English', age: 29 });
    const teacherId = createResponse.body._id;

    const updatedData = { name: 'Anita Sharma', subject: 'English', age: 30 };
    const updateResponse = await request(app)
      .put(`/api/teachers/${teacherId}`)
      .send(updatedData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe(updatedData.name);
  });

  it('DELETE /api/teachers/:id should delete a teacher', async () => {
    // First create a teacher to delete
    const createResponse = await request(app)
      .post('/api/teachers')
      .send({ name: 'Raj', subject: 'History', age: 45 });
    const teacherId = createResponse.body._id;

    const deleteResponse = await request(app).delete(`/api/teachers/${teacherId}`);
    expect(deleteResponse.status).toBe(204);
  });
});

// Optional: Close DB connection after all tests complete, if needed
afterAll(async () => {
  await mongoose.connection.close();
});
