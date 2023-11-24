const request = require('supertest');
const app = require('../app');
require('../models')


let id;


test('GET / directors debe retornar los directores', async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

test('POST /directors debe crear un director', async () => { 
    const director = {
        firstName: 'Michael',
        lastName: 'Bay',
        nationality: 'American',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Michael.bay.png/250px-Michael.bay.png',
        birthday: '17/02/1965'
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.lastName).toBe(director.lastName);
 });

 test('PUT /directors/:id debe actualizar un director', async () => { 
    const director = {nationality: 'Chinese'}
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.nationality).toBe(director.nationality);
  });

  test('DELETE /directors/:id debe eliminar un director', async () => { 
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
   });