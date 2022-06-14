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
                descripcion: "Este pollo en salsa, además de riquísimo, es facilísimo y muy rápido de preparar. También es una forma deliciosa de comer verduras porque la salsa está llena de verdura. Puedes triturarlas además si en tu casa no os gusta encontrarlas en trozos. Es una forma estupenda de que los niños las coman. Está tan rica esta salsa que mojarás pan en ella. Ya verás. Es uno de esos platos que puedes servir a diario o para cualquier celebración, no dejará a nadie indiferente. Te animo a que disfrutes cocinándolo y en la mesa rodeado de los tuyos.",
                duracion: "30min",
                extra: "Puedes sustituir el coñac por vino y añadir o quitar verduras al gusto. La salsa queda muy cremosa y, si lo prefieres, puedes dejarla con tropezones sin triturar. Puedes preparar esta receta con antelación y guardarla en la nevera. Además también la puede",
                fecha_publicacion: "2022-02-09T23:00:00.000Z",
                valoracion: 0,
                id_usuario: 1,
                nickname: "AlexUA"
            })
            .expect(200, done);
    });

    it('Se devuelve un mensaje "No se han encontrado resultados" si la receta no existe', done => {
        request(app)
            .get('/api/recetas/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({msg: 'No se han encontrado resultados'})
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });
});