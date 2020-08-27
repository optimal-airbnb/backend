const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbconnection.js');
// const { get } = require('../router/userRouter.js');
// const { application } = require('express');

let token;
beforeEach((done) => {
    request(server)
        .post('/api/auth/login')
        .send({
            username: "admin",
            password: "password"
        })
        .end((err, res) => {
            token = res.body.token; // save the token!
            done();
        })
})

describe('server imageRoute test endpoint', () => {

    describe('GET/', () => {
        it('Should match json type object', () => {
            return request(server).get('/api/images').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        });
        it('Should required authorization if no authorization return status 401 correctly', () => {
            return request(server)
                .get('/api/images')
                .then((res) => {
                    expect(res.status).toBe(401)
                });
        });

        it('Should return with JSON', () => {
            return request(server).get('/api/images')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res.type).toBe("application/json");
                })
        })
    })
})