const request = require('supertest');
const app = require('../index');

/**
 * Tests para comprobar el correcto funcionamiento del login
 */
describe('POST /api/login', () => {
    it('Se devuelve un mensaje "Login completado" si el login se ha realizado correctamente', done => {
        const data = {
            email: 'ald19@alu.ua.es',
            password: '12345'
        }
        request(app)
            .post('/api/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    it('Se devuelve un mensaje "Credenciales inválidas" si el login no se ha realizado correctamente', done => {
        const data = {
            email: 'alex@ua.es',
            password: '0000'
        }
        request(app)
            .post('/api/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400)
            .expect({msg: 'Credenciales inválidas'})
            .end(err => {
                if(err) return done(err);
                done();
            })
    });
});

/**
 * Tests para comprobar el correcto funcionamiento del registro
 */
 describe('POST /api/registro', () => {
    it('Se devuelve un mensaje "El usuario ha sido registrado correctamente" indicando que el registro se ha realizado correctamente', done => {
        const data = {
            nombre: 'test',
            nickname: 'test',
            email: 'test@ua.es',
            password: '12345',
            fecha_nacimiento: '1980-01-01'
        }
        request(app)
            .post('/api/registro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({msg: 'El usuario ha sido registrado correctamente'})
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    it('Se devuelve un mensaje de error "Ya hay un usuario registrado con ese email o faltan campos" si ya existe un usuario con ese email', done => {
        const data = {
            name: 'test',
            nickname: 'test',
            email: 'alex@ua.es',
            password: '12345',
            birth_date: '1980-01-01'
        }
        request(app)
            .post('/api/registro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400)
            .expect('Ya hay un usuario registrado con ese email o faltan campos')
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    it('Se devuelve un mensaje de error "Ya hay un usuario registrado con ese email o faltan campos" si falta algún campo por rellenar', done => {
        const data = {
            name: 'test',
            email: 'test2@ua.es',
            password: '12345',
        }
        request(app)
            .post('/api/registro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400)
            .expect('Ya hay un usuario registrado con ese email o faltan campos')
            .end(err => {
                if(err) return done(err);
                done();
            })
    })
 });