const request = require('supertest');
const app = require('../app');
require('../models')

//Variable global para los test//
let id;


test('GET /actors debe retornar los actores', async () => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /actors debe crear un actor', async () => { 
    const actor = {
        firstName: 'Li',
        lastName: 'Lianjie',
        nationality: 'Singaporean',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jet_Li_2009_%28cropped%29.jpg/220px-Jet_Li_2009_%28cropped%29.jpg',
        birthday: '26/04/1963'
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
  });

  test('PUT /actors/:id debe actualizar un actor', async () => { 
        const actor = {birthday: '26/05/1963'}
        const res = await request(app).put(`/actors/${id}`).send(actor);
        expect(res.status).toBe(200);
        expect(res.body.birthday).toBe(actor.birthday);
   });

   test('DELETE /actors/:id debe eliminar un actor', async () => { 
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
    });

