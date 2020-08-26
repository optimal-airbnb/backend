const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbconnection.js');



describe('server propertyRoute endpoint', () => {

    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('GET/', () => {
        it('Should return status 200 correctly', () => {
            return request(server).get('/api/properties').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        });
        // it('Should return status 200 no jest', () => {
        //     return request(server).get('/').expect(200);
        // });
        // it('Should return Hello: " World, The api is working"', () =>{
        //     return request(server).get('/').expect({Hello: "World, The api is working" });
        // });
        // it('Should return an Hello property with the valau of "World, Tha api is working ', () => {
        //     return request(server)
        //             .get('/')
        //             .then(res => {
        //                 expect(res.body.Hello).toBe("World, The api is working" );
        //             })
        // })
    })

    // // test the Auth route 
    // describe('Auth Router', () => {
        
    //     describe('POST/register', () => {
    //         it('Should add the user correctly', async () => {
    //             await request(server).post('/api/auth/register')
    //                 .send({
    //                     name: "name",
    //                     username: "username",
    //                     password: "password",
    //                     email: "name@name.com"
    //                 })
    //                 const users = await db('users');
    //                 expect(users).toHaveLength(1);
    //         })
    //     })
    //     describe('POST/LOGIN', () => {
    //         it('Should login by provided username and password', async () => {
    //             await request(server).post('/api/auth/login')
    //                     .send({
    //                         username: "username",
    //                         password: "password"
    //                     })
                   
    //                     expect(res.statusCode).toBe(200);
    //         })
    //     })

    // })

    // describe('users router', () => {
       
    //     describe('GET/', () => {
    //         it('Should return status 200 correctly ', () => {
    //             return request(server).get('/').then(res => {
    //                 expect(res.status).toBe(200);
    //             })
    //         });
    //         it('Should return status 200 correctly no jest', () => {
    //             return request(server).get('/').expect(200);
    //         });
    //     })
    //     describe('GET/ By Id', () => {
    //         it('Should return status 404 correctly if has no id ', () => {
    //             return request(server).get('/:id').then(res => {
    //                 expect(res.status).toBe(404);
                    
    //             });
    //         });
    //         it('Should return status 404 correctly no jest',  () => {
    //             return request(server).get('/:id').then(res => {
    //                 expect(res.type).toMatch(/text/i);
                    
    //             });
                
    //         });
            
    //     });
        
    // })
})