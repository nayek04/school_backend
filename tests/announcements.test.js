const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app1');

describe('Announcements API', () => {
  it('POST /api/announcements should create a new announcement', async () => {
    const newAnnouncement = { title: 'Holiday', description: 'School closed on Friday' };
    const response = await request(app)
      .post('/api/announcements')
      .send(newAnnouncement);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Holiday');
    expect(response.body._id).toBeDefined();
  });

  it('GET /api/announcements should return all announcements', async () => {
    const response = await request(app).get('/api/announcements');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /api/announcements/:id should update an announcement', async () => {
    const createRes = await request(app)
      .post('/api/announcements')
      .send({ title: 'Event', description: 'Sports day next week' });
    const announcementId = createRes.body._id;

    const updatedData = { title: 'Event Update', description: 'Sports day postponed' };
    const updateRes = await request(app)
      .put(`/api/announcements/${announcementId}`)
      .send(updatedData);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe(updatedData.title);
  });

  it('DELETE /api/announcements/:id should delete an announcement', async () => {
    const createRes = await request(app)
      .post('/api/announcements')
      .send({ title: 'Notice', description: 'Library closed' });
    const announcementId = createRes.body._id;

    const deleteRes = await request(app).delete(`/api/announcements/${announcementId}`);

    expect(deleteRes.status).toBe(204);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
