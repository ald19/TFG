const request = require('supertest');
const app = require('../index');

/**
 * Test que comprueba que el listado de recetas se devuelve correctamente
 */
describe('GET /api/recipes', () => {
    it('Se devuelve un JSON que contiene el listado de todas las recetas', done => {
        request(app)
            .get('/api/recetas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Test que comprueba si una receta en concreto se devuelve correctamente
 */
describe('GET /api/recipes/:id', () => {
    it('Se devuelve un JSON que contiene la información de una receta en específico', done => {
        request(app)
            .get('/api/recetas/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                id: 1,
                nombre: "Pollo con salsa",
                descripcion: "Un pollo con una salsa especiada",
                duracion: "30min",
                extra: null,
                valoracion: 0,
                id_usuario: 1
            })
            .expect(200, done);
    });

    it('Se devuelve un mensaje "No se han encontrado resultados" si la receta no existe', done => {
        request(app)
            .get('/api/recetas/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(404)
            .expect('No se han encontrado resultados')
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });
});