const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;


test('GET /movies debe retornar las peliculas', async () => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /movies debe crear una pelicula', async () => { 
    const movie = {
        name: 'Bad Boys',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkab3XlJUO8WWpVr3k-LH5gtvFDzpdfVEUg&usqp=CAU',
        synopsis: 'Two Miami cops have 72 hours to find $100 million worth of heroin stolen from their police stations evidence locker, but to do so, they must switch identities',
        releaseYear: 1995
    }
    const res = await request(app).post('/movies').send(movie);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
  });

  test('POST /movies/:id/actors debe retornar las peliculas y sus actores', async () => { 
    const actor = await Actor.create({
        firstName: 'Will',
        lastName: 'Smith',
        nationality: 'American',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/200px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
        birthday: '25/09/1968'
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
   });

  test('POST /movies/:id/directors debe retornar las peliculas y sus directores', async () => { 
    const director = await Director.create({
        firstName: 'Michael',
        lastName: 'Bay',
        nationality: 'American',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Michael.bay.png/250px-Michael.bay.png',
        birthday: '17/02/1965'
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
   });
  test('POST /movies/:id/genres debe retornar las peliculas y sus generos', async () => { 
    const genre = await Genre.create({
        name: 'Action'
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
   });

   test('UPDATE /movies/:id debe actualizar una pelicula', async () => { 
    const genre = {name: 'Adventure'}
    const res = await request(app).put(`/movies/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
    });

    test('DELETE /movie/:id debe eliminar una pelicula', async () => { 
        const res = await request(app).delete(`/movies/${id}`);
        expect(res.status).toBe(204);
     });